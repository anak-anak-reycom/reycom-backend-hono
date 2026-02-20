import { rateLimiter } from 'hono-rate-limiter';

export const loginLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 menit
  limit: 5,

  keyGenerator: (c) =>
    c.req.header('x-forwarded-for') ??
    c.req.header('x-real-ip') ??
    c.req.raw.headers.get('host') ?? 
    'anon',
});