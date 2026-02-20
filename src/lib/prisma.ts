import type { MiddlewareHandler } from 'hono';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import type { ContextWithPrisma } from '../types/context.js';

import * as dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

const withPrisma: MiddlewareHandler<ContextWithPrisma> = async (c, next) => {
  c.set('prisma', prisma);
  await next();
};

export default withPrisma;
