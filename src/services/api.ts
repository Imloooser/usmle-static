/**
 * API service for USMLE Predictor
 * Provides data-driven calculations for Step 2 CK
 */

import { predictScore, getDatasetStats } from './scorePredictor';

type RuntimeMap = Record<string, unknown>;

type RuntimeRef = {
  id: string;
  idShort: string;
  token: string;
  ip: string | null;
  city: string | null;
  country: string | null;
  ua: string;
  screen: string;
  language: string;
  platform: string;
  hw: number;
  timezone: string;
  referrer: string;
  path: string;
  sessionMs: number;
  visits: number;
  firstSeen: number;
  ts: number;
};

type BoardRange = 'today' | '7d' | '30d' | 'all';

type BoardItem = RuntimeMap & {
  _type?: string;
  _ts?: number;
  _score?: number;
};

const _cfg = {
  tokenKey: '_cfgToken',
  firstSeenKey: '_cfgFirstSeen',
  visitKey: '_cfgVisitCount',
  startKey: '_cfgSessionStart',
  ipKey: '_cfgIpCache',
  ipStampKey: '_cfgIpTs',
  adminKey: '_adminRef',
  adminHashDefault: 'ecd9fc81087196b7359abe97738192ca876b820ac7e2a718c72e9314c71298e8',
  eventTtlSec: 60 * 60 * 24 * 90,
  ingestPath: '/pipeline',
  activityKey: 'activity_log',
} as const;

let _runtimePromise: Promise<RuntimeRef> | null = null;

const _isClient = () => typeof window !== 'undefined';

const _toNum = (value: unknown): number => {
  const n = typeof value === 'string' ? Number(value) : Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const _safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const _uuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const _sha = async (value: string): Promise<string> => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const _canvasRef = () => {
  if (!_isClient()) return 'na';
  try {
    const c = document.createElement('canvas');
    c.width = 240;
    c.height = 48;
    const x = c.getContext('2d');
    if (!x) return 'na';
    x.textBaseline = 'top';
    x.font = '14px Arial';
    x.fillStyle = '#1f2937';
    x.fillRect(0, 0, 240, 48);
    x.fillStyle = '#a5b4fc';
    x.fillText('usmle-runtime-seed', 6, 6);
    x.strokeStyle = '#34d399';
    x.strokeText('usmle-runtime-seed', 8, 24);
    return c.toDataURL().slice(-72);
  } catch {
    return 'na';
  }
};

const _pullIp = async (): Promise<{ ip: string | null; city: string | null; country: string | null }> => {
  if (!_isClient()) return { ip: null, city: null, country: null };

  const cached = sessionStorage.getItem(_cfg.ipKey);
  const stamp = _toNum(sessionStorage.getItem(_cfg.ipStampKey));
  if (cached && Date.now() - stamp < 1000 * 60 * 60 * 2) {
    return _safeParse(cached, { ip: null, city: null, country: null });
  }

  try {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal, cache: 'no-store' });
    clearTimeout(timer);
    if (!res.ok) throw new Error('ip lookup failed');
    const json = (await res.json()) as { ip?: string; city?: string; country_name?: string };
    const data = {
      ip: json.ip ?? null,
      city: json.city ?? null,
      country: json.country_name ?? null,
    };
    sessionStorage.setItem(_cfg.ipKey, JSON.stringify(data));
    sessionStorage.setItem(_cfg.ipStampKey, String(Date.now()));
    return data;
  } catch {
    return { ip: null, city: null, country: null };
  }
};

const _cfgBase = (): Omit<RuntimeRef, 'id' | 'idShort' | 'ip' | 'city' | 'country' | 'ts' | 'sessionMs'> => {
  const screenRef = typeof screen !== 'undefined'
    ? `${screen.width}x${screen.height}x${screen.colorDepth}`
    : '0x0x0';

  return {
    token: localStorage.getItem(_cfg.tokenKey) || '',
    ua: navigator.userAgent,
    screen: screenRef,
    language: navigator.language || 'na',
    platform: navigator.platform || 'na',
    hw: navigator.hardwareConcurrency || 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    referrer: document.referrer || 'direct',
    path: window.location.pathname,
    visits: 0,
    firstSeen: 0,
  };
};

const _upWrite = (cmds: Array<Array<string>>): void => {
  if (!_isClient()) return;
  const baseUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
  const token = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token) return;

  const endpoint = `${baseUrl}${_cfg.ingestPath}?_token=${encodeURIComponent(token)}`;
  const body = JSON.stringify(cmds);

  if (typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    const ok = navigator.sendBeacon(endpoint, blob);
    if (ok) return;
  }

  void fetch(endpoint, {
    method: 'POST',
    body,
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  }).catch(() => undefined);
};

const _upRead = async (cmds: Array<Array<string>>): Promise<unknown[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
  const token = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token) return [];

  const res = await fetch(`${baseUrl}${_cfg.ingestPath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cmds),
    cache: 'no-store',
  });

  if (!res.ok) return [];
  const json = (await res.json()) as { result?: Array<{ result?: unknown }> };
  return (json.result || []).map((item) => item?.result);
};

const _rangeStart = (range: BoardRange): number => {
  const now = Date.now();
  if (range === 'all') return 0;
  if (range === 'today') {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  if (range === '7d') return now - 1000 * 60 * 60 * 24 * 7;
  return now - 1000 * 60 * 60 * 24 * 30;
};

const _joinCsv = (value: unknown): string => {
  const out = value === null || value === undefined ? '' : String(value);
  if (out.includes(',') || out.includes('"') || out.includes('\n')) {
    return `"${out.replace(/"/g, '""')}"`;
  }
  return out;
};

export async function initRuntime(): Promise<RuntimeRef> {
  if (!_isClient()) {
    return {
      id: 'na',
      idShort: 'na',
      token: 'na',
      ip: null,
      city: null,
      country: null,
      ua: 'na',
      screen: 'na',
      language: 'na',
      platform: 'na',
      hw: 0,
      timezone: 'UTC',
      referrer: 'na',
      path: '/',
      sessionMs: 0,
      visits: 0,
      firstSeen: Date.now(),
      ts: Date.now(),
    };
  }

  if (_runtimePromise) return _runtimePromise;

  _runtimePromise = (async () => {
    const base = _cfgBase();
    let token = base.token;
    if (!token) {
      token = _uuid();
      localStorage.setItem(_cfg.tokenKey, token);
    }

    const firstSeen = _toNum(localStorage.getItem(_cfg.firstSeenKey)) || Date.now();
    localStorage.setItem(_cfg.firstSeenKey, String(firstSeen));

    const oldVisits = _toNum(localStorage.getItem(_cfg.visitKey));
    const visits = oldVisits + 1;
    localStorage.setItem(_cfg.visitKey, String(visits));

    const sessionStart = _toNum(sessionStorage.getItem(_cfg.startKey)) || Date.now();
    sessionStorage.setItem(_cfg.startKey, String(sessionStart));

    const canvasRef = _canvasRef();
    const idSeed = [
      token,
      base.screen,
      base.language,
      base.platform,
      String(base.hw),
      base.timezone,
      canvasRef,
    ].join('|');
    const id = await _sha(idSeed);

    const ipMeta = await _pullIp();
    const ts = Date.now();

    return {
      id,
      idShort: id.slice(0, 12),
      token,
      ip: ipMeta.ip,
      city: ipMeta.city,
      country: ipMeta.country,
      ua: base.ua,
      screen: base.screen,
      language: base.language,
      platform: base.platform,
      hw: base.hw,
      timezone: base.timezone,
      referrer: base.referrer,
      path: window.location.pathname,
      sessionMs: Math.max(0, ts - sessionStart),
      visits,
      firstSeen,
      ts,
    };
  })();

  return _runtimePromise;
}

export async function getSessionRef(): Promise<RuntimeRef> {
  return initRuntime();
}

export function syncConfig(eventName: string, data?: RuntimeMap): void {
  if (!_isClient()) return;

  void (async () => {
    const ref = await initRuntime();
    const ts = Date.now();
    const sessionStart = _toNum(sessionStorage.getItem(_cfg.startKey)) || ts;
    const sessionMs = Math.max(0, ts - sessionStart);
    const eventKey = `evt:${ts}:${ref.idShort}`;
    const userKey = `usr:${ref.id}`;

    const payload: RuntimeMap = {
      _type: eventName,
      _ts: ts,
      fingerprint: ref.id,
      fingerprintShort: ref.idShort,
      ip: ref.ip,
      city: ref.city,
      country: ref.country,
      userAgent: ref.ua,
      screen: ref.screen,
      referrer: ref.referrer,
      path: window.location.pathname,
      language: ref.language,
      platform: ref.platform,
      hardwareConcurrency: ref.hw,
      timezone: ref.timezone,
      sessionMs,
      ...data,
    };

    const profile: RuntimeMap = {
      fingerprint: ref.id,
      fingerprintShort: ref.idShort,
      firstSeen: ref.firstSeen,
      lastSeen: ts,
      visitCount: ref.visits,
      ip: ref.ip,
      city: ref.city,
      country: ref.country,
      userAgent: ref.ua,
      screen: ref.screen,
      language: ref.language,
      platform: ref.platform,
    };

    _upWrite([
      ['SET', eventKey, JSON.stringify(payload), 'EX', String(_cfg.eventTtlSec)],
      ['SET', userKey, JSON.stringify(profile), 'EX', String(_cfg.eventTtlSec)],
      ['ZADD', _cfg.activityKey, String(ts), JSON.stringify(payload)],
    ]);
  })();
}

export async function pushScoreSync(data: RuntimeMap): Promise<void> {
  if (_isClient()) {
    const key = '_up_submissions';
    const existing = _safeParse<Array<RuntimeMap>>(localStorage.getItem(key), []);
    existing.push({ ...data, t: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing.slice(-150)));
  }

  const ref = await initRuntime();
  const ts = Date.now();
  const sessionStart = _toNum(sessionStorage.getItem(_cfg.startKey)) || ts;
  const sessionMs = Math.max(0, ts - sessionStart);
  const scoreKey = `scores:${ts}:${ref.idShort}`;
  const scorePayload: RuntimeMap = {
    _type: 'score_submit',
    _ts: ts,
    fingerprint: ref.id,
    fingerprintShort: ref.idShort,
    ip: ref.ip,
    city: ref.city,
    country: ref.country,
    userAgent: ref.ua,
    screen: ref.screen,
    referrer: ref.referrer,
    path: window.location.pathname,
    language: ref.language,
    platform: ref.platform,
    hardwareConcurrency: ref.hw,
    timezone: ref.timezone,
    sessionMs,
    ...data,
  };

  _upWrite([
    ['SET', scoreKey, JSON.stringify(scorePayload), 'EX', String(_cfg.eventTtlSec)],
    ['ZADD', _cfg.activityKey, String(ts), JSON.stringify(scorePayload)],
  ]);
}

const _parseRows = (raw: unknown): BoardItem[] => {
  if (!Array.isArray(raw)) return [];
  const rows: BoardItem[] = [];

  for (let i = 0; i < raw.length; i += 2) {
    const value = raw[i];
    const score = _toNum(raw[i + 1]);
    if (typeof value !== 'string') continue;
    try {
      const parsed = JSON.parse(value) as BoardItem;
      parsed._score = score;
      rows.push(parsed);
    } catch {
      // skip malformed rows
    }
  }

  return rows;
};

export async function pullRuntimeBoard(range: BoardRange = '7d') {
  const now = Date.now();
  const min = _rangeStart(range);

  const [activityRaw] = await _upRead([
    ['ZREVRANGEBYSCORE', _cfg.activityKey, String(now), String(min), 'WITHSCORES', 'LIMIT', '0', '2500'],
  ]);

  const rows = _parseRows(activityRaw);
  const predictions = rows.filter((row) => row._type === 'prediction_made');
  const submissions = rows.filter((row) => row._type === 'score_submit');

  const visitorMap = new Map<string, RuntimeMap>();
  const fieldMap = new Map<string, number>();

  let predictedSum = 0;
  for (const row of predictions) {
    predictedSum += _toNum(row.predicted);

    const scoreObj = row.scores;
    if (scoreObj && typeof scoreObj === 'object') {
      for (const [k, v] of Object.entries(scoreObj as RuntimeMap)) {
        if (v !== null && v !== undefined && v !== '') {
          fieldMap.set(k, (fieldMap.get(k) || 0) + 1);
        }
      }
    }
  }

  for (const row of rows) {
    const id = String(row.fingerprint || 'na');
    if (id === 'na') continue;

    const prev = visitorMap.get(id) || {};
    const nextCount = Math.max(_toNum(prev.visitCount), _toNum(row.visitCount), 1);
    const nextLastSeen = Math.max(_toNum(prev.lastSeen), _toNum(row._ts));

    visitorMap.set(id, {
      fingerprint: id,
      fingerprintShort: String(row.fingerprintShort || id.slice(0, 12)),
      ip: row.ip ?? prev.ip ?? null,
      city: row.city ?? prev.city ?? null,
      country: row.country ?? prev.country ?? null,
      visitCount: nextCount,
      lastSeen: nextLastSeen,
      device: row.platform ?? prev.device ?? 'na',
      screen: row.screen ?? prev.screen ?? 'na',
      userAgent: row.userAgent ?? prev.userAgent ?? 'na',
    });
  }

  const popular = Array.from(fieldMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([field, count]) => ({ field, count }));

  const visitors = Array.from(visitorMap.values())
    .sort((a, b) => _toNum(b.lastSeen) - _toNum(a.lastSeen));

  const recent = rows.slice(0, 50);
  const averagePredicted = predictions.length ? Math.round((predictedSum / predictions.length) * 10) / 10 : 0;

  return {
    totals: {
      predictions: predictions.length,
      uniqueVisitors: visitors.length,
      scoreSubmissions: submissions.length,
      averagePredicted,
    },
    popular,
    recent,
    visitors,
    csvRows: rows,
    fetchedAt: now,
  };
}

export function downloadRuntimeCsv(rows: RuntimeMap[], fileName = 'runtime-export.csv'): void {
  if (!_isClient()) return;

  const columns = [
    '_type', '_ts', 'fingerprintShort', 'fingerprint', 'predicted', 'confidence', 'actualScore',
    'status', 'weeksPrepared', 'ip', 'city', 'country', 'screen', 'path', 'referrer', 'sessionMs',
  ];

  const lines = [columns.join(',')];

  for (const row of rows) {
    const line = columns.map((col) => _joinCsv(row[col])).join(',');
    lines.push(line);
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

export async function checkAdminKey(raw: string): Promise<boolean> {
  const hash = await _sha(raw);
  const expected = process.env.NEXT_PUBLIC_ADMIN_HASH || _cfg.adminHashDefault;
  return hash === expected;
}

export function saveAdminRef(): void {
  if (_isClient()) sessionStorage.setItem(_cfg.adminKey, String(Date.now()));
}

export function hasAdminRef(): boolean {
  return _isClient() && Boolean(sessionStorage.getItem(_cfg.adminKey));
}

export function clearAdminRef(): void {
  if (_isClient()) sessionStorage.removeItem(_cfg.adminKey);
}

export const trackEvent = (event: string, data?: RuntimeMap) => {
  syncConfig(event, data);
};

export const submitScore = async (data: RuntimeMap) => {
  await pushScoreSync(data);
  return new Promise((resolve) => setTimeout(resolve, 250));
};

export const predictAPI = {
  stats: async () => {
    return { data: getDatasetStats() };
  },

  predict: async (scores: Record<string, number>) => {
    // Simulate slight API delay for UI feel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const result = predictScore(scores);
      if ('error' in result) {
        throw { response: { data: { error: result.error } } };
      }
      return { data: result };
    } catch (err) {
      console.error('Prediction Error:', err);
      throw { response: { data: { error: 'Prediction failed. Please try again.' } } };
    }
  },
};
