import { HTTPException } from 'hono/http-exception';
import type { PrismaClient, Prisma } from '../../generated/prisma/client.js';
import {
  type CreateCategoryRequest,
  type UpdateCategoryRequest,
  type CategoryData,
  type ApiResponse,
  toCategoryResponse,
  toModelListResponse,
} from '../../models/category/category-model.js';
import { CategoryRepository } from '../../repositories/category/category-repository.js';

export class CategoryService {

  static async CreateCategory(
    prisma: PrismaClient,
    request: CreateCategoryRequest,
  ): Promise<ApiResponse<CategoryData>> {

  
    const existing = await CategoryRepository.countByNameCategory(
      prisma,
      request.nameCategory,
    );

    if (existing) {
      throw new HTTPException(400, {
        message: 'Category with the same name already exists',
      });
    }

    const { career, ...categoryData } = request;

    const category = await CategoryRepository.createCategory(prisma, {
      ...categoryData,
      ...(career && career.length > 0 && {
        careers: {
          create: career.map((c) => ({
            job_name: c.jobName,
            job_date: c.jobDate,
          })),
        },
      }),
      name_category: '',
      job_type: ''
    });

    return toCategoryResponse(category, 'Category created successfully');
  }

  static async GetAllCategories(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CategoryData[]>> {

    const categories = await CategoryRepository.getAllCategories(prisma);

    const page = 1;
    const limit = categories.length;
    const total = categories.length;

    return toModelListResponse(
      categories,
      'Get all categories successfully', page, limit, total
    );
  }

  // ===============================
  // GET CATEGORY BY ID
  // ===============================
  static async GetCategoryById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CategoryData>> {

    const category = await CategoryRepository.findCategoryById(prisma, id);

    if (!category) {
      throw new HTTPException(404, {
        message: 'Category with this id not found',
      });
    }

    return toCategoryResponse(category, 'Get category successfully');
  }

// ===============================
  // UPDATE CATEGORY
  // ===============================
  static async UpdateCategoryById(
    prisma: PrismaClient,
    id: number,
    request: UpdateCategoryRequest,
  ): Promise<ApiResponse<CategoryData>> {

    const existing = await CategoryRepository.findCategoryById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }

    // Convert camelCase to snake_case for Prisma input
    const prismaInput: Prisma.CategoryUpdateInput = {};
    
    if (request.nameCategory !== undefined && request.nameCategory !== null) {
      prismaInput.name_category = request.nameCategory;
    }
    
    if (request.jobType !== undefined && request.jobType !== null) {
      prismaInput.job_type = request.jobType;
    }
    
    if (request.career && request.career.length > 0) {
      prismaInput.careers = {
        create: request.career.map((c) => ({
          job_name: c.jobName,
          job_date: c.jobDate,
        })),
      };
    }

    // optional: prevent duplicate name on update
    if (request.nameCategory) {
      const duplicate = await CategoryRepository.findCategoryByName(
        prisma,
        request.nameCategory,
      );

      if (duplicate && duplicate.id !== id) {
        throw new HTTPException(400, {
          message: 'Category name already used by another category',
        });
      }
    }

    const updated = await CategoryRepository.updateCategoryById(
      prisma,
      id,
      prismaInput,
    );

    return toCategoryResponse(updated, 'Category updated successfully');
  }

  // ===============================
  // DELETE CATEGORY
  // ===============================
  static async DeleteCategoryById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CategoryData>> {

    const existing = await CategoryRepository.findCategoryById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }

    const deleted = await CategoryRepository.deleteCategoryById(prisma, id);

    return toCategoryResponse(deleted, 'Category deleted successfully');
  }
}
