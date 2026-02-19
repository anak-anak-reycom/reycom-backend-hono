import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

import { openApiDoc } from './ui/swagger.js';
import { corsMiddleware } from './helpers/cors.js';
import { errorHandler } from './helpers/errorHandler.js';
import { Routes } from './routes/route.js';

const app = new Hono();
const publicRoutes = new Routes();

app.get('/docs', (c) => c.json(openApiDoc));
app.get('/', swaggerUI({ url: '/docs' }));

app.route('/', corsMiddleware);
app.route('/', publicRoutes.app);

app.onError(errorHandler);

serve({ fetch: app.fetch, port: 3000 });
