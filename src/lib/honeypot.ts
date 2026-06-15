/**
 * Shared honeypot handler. These decoy endpoints don't exist for real users —
 * anyone hitting them is probing for the raw dataset. We log the hit (shows up in
 * Vercel logs / Observability, where you can add an alert) and return a plain 404
 * so the trap isn't obvious.
 */
export function honeypotTrap(req: Request): Response {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  const ua = req.headers.get('user-agent') ?? 'unknown';
  const path = new URL(req.url).pathname;
  console.warn(`[honeypot] data-endpoint probe path=${path} ip=${ip} ua=${ua}`);
  return Response.json({ error: 'Not found' }, { status: 404 });
}
