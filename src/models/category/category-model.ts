import type { Category, Careers } from "../../generated/prisma/client.js";
import  {
 type PaginationMeta,
   buildPaginationMeta
} from "../../types/pagination.js"

/* =======================
   REQUEST
======================= */
export type CreateCategoryRequest = {
    nameCategory: string;
    jobType: string;
    career?: Array<{
        jobName: string;
        jobDate?: Date;
    }>;
};

/* =======================
   DATA RESPONSE
======================= */

export type CareerData = {
    id: number;
    jobName: string;
    jobDate: Date;
};

export type CategoryData = {
    idCategory: number;
    nameCategory: string;
    jobType: string;
    careers?: CareerData[];   
    createdAt?: Date;
    updatedAt?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T, M = unknown> = {
    success: boolean;
    message: string;
    data: T;
    meta?: M;
};

/* =======================
   MAPPERS
======================= */

function toCareerData(career: Careers): CareerData {
    return {
        id: career.id,
        jobName: career.job_name,
        jobDate: career.job_date,
    };
}

export function toCategoryData(
    category: Category & { careers?: Careers[] }
): CategoryData {
    return {
        idCategory: category.id,
        nameCategory: category.name_category,
        jobType: category.job_type,
        careers: category.careers?.map(toCareerData),
        createdAt: category.created_at,
        updatedAt: category.updated_at,
    };
}

export function toCategoryResponse(
    category: Category & { careers?: Careers[] },
    message: string
): ApiResponse<CategoryData> {
    return {
        success: true,
        message,
        data: toCategoryData(category),
    };
}

export function toModelListResponse(
    categories: (Category & { careers?: Careers[] })[],
    message: string,
    page: number,
    limit: number,
    total: number
): ApiResponse<CategoryData[]> {
    return {
        success: true,
        message,
        data: categories.map(toCategoryData),
        meta: buildPaginationMeta( page, limit, total),
    };
}
