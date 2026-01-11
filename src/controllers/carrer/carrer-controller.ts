import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CarrerService } from '../../services/carrer/carrer-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const CareerController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL CAREERS
// ===============================
CareerController.get('/career', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await CarrerService.GetAllCareers(prisma);
    return c.json(response, 200);
})

// ===============================
// GET CAREER BY ID
// ===============================
CareerController.get('/career/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_career = Number(c.req.param('id'));
    const response = await CarrerService.GetCareerById(prisma, id_career);
    return c.json(response, 200);
})

// ===============================
// CREATE CAREER
// ===============================
CareerController.post('/career', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();

    const response = await CarrerService.CreateCareer(prisma, request);
    return c.json(response, 201);
})

// ===============================
// UPDATE APPLY
// ===============================
CareerController.patch('/career/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_career = Number(c.req.param('id'));
    const request = await c.req.json();
    const response = await CarrerService.UpdateCareerById(prisma, id_career, request);
    return c.json(response, 200);
})

// ===============================
// DELETE APPLY
// ===============================
CareerController.delete('/career/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_career = Number(c.req.param('id'));
    const response = await CarrerService.DeleteCareerById(prisma, id_career);
    return c.json(response, 200);
})