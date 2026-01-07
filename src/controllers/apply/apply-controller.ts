import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { ApplyService } from '../../services/apply/apply-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const ApplyController = new Hono<ContextWithPrisma>();

ApplyController.get('/apply', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await ApplyService.getAllApply(prisma);
    return c.json(response, 200);
});