import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CategoryService } from '../../services/category/category-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const CategoryController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL CATEGORIES
// ===============================
CategoryController.get('/category', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await CategoryService.GetAllCategories(prisma);
    return c.json(response, 200);
})

// ===============================
// GET CATEGORY BY ID
// ===============================
CategoryController.get('/category/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_category = Number(c.req.param('id'));
    const response = await CategoryService.GetCategoryById(prisma, id_category);
    return c.json(response, 200);
})

// ===============================
// CREATE CATEGORY
// ===============================
CategoryController.post('/category', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();
    const response = await CategoryService.CreateCategory(prisma, request);
    return c.json(response, 201);
})

// ===============================
// UPDATE CATEGORY
// ===============================
CategoryController.patch('/category/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_category = Number(c.req.param('id'));
    const request = await c.req.json();
    const response = await CategoryService.UpdateCategoryById(prisma, id_category, request);
    return c.json(response, 200);
})

// ===============================
// DELETE CATEGORY
// ===============================
CategoryController.delete('/category/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_category = Number(c.req.param('id'));
    const response = await CategoryService.DeleteCategoryById(prisma, id_category);
    return c.json(response, 200);
})