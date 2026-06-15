/**
 * Server-side prediction endpoint.
 *
 * All model code, coefficients, and the raw datasets live here on the server and
 * never ship to the browser. The client posts only the user's scores and renders
 * the returned result. Runs as a Node serverless function on Vercel.
 */
import { predictScore, getDatasetStats } from '@/services/scorePredictor';
import { predictStep1 } from '@/services/step1Predictor';
import { predictStep3, loadDataset } from '@/services/step3Predictor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Only our own site (and Vercel preview deploys) should call this. A browser
// always sends Origin on a POST; scripts/curl scrapers usually don't, or send a
// foreign one. Rejecting them here — before parsing the body or touching the
// dataset — blocks casual scraping and keeps junk requests off the compute bill.
const ALLOWED_HOSTS = ['usmlepredictor.com', 'www.usmlepredictor.com', 'localhost'];

function isAllowedOrigin(req: Request): boolean {
  const candidate = req.headers.get('origin') || req.headers.get('referer');
  if (!candidate) return false;
  try {
    const host = new URL(candidate).hostname;
    return ALLOWED_HOSTS.includes(host) || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { exam?: string; action?: string; input?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const exam = body?.exam;
    const input = body?.input ?? {};

    if (exam === 'step2') {
      if (body?.action === 'stats') {
        return Response.json(await getDatasetStats());
      }
      return Response.json(await predictScore(input as never));
    }
    if (exam === 'step1') {
      return Response.json(predictStep1(input as never));
    }
    if (exam === 'step3') {
      const dataset = await loadDataset();
      return Response.json(predictStep3(input as never, dataset));
    }
    return Response.json({ error: 'Unknown exam type.' }, { status: 400 });
  } catch (err) {
    console.error('Prediction API error:', err);
    return Response.json({ error: 'Prediction failed. Please try again.' }, { status: 500 });
  }
}
