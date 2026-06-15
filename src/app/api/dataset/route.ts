import { honeypotTrap } from '@/lib/honeypot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(req: Request) { return honeypotTrap(req); }
export function POST(req: Request) { return honeypotTrap(req); }
