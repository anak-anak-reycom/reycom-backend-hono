import type { Careers, Category } from "../../generated/prisma/client.js";

/* =======================
   DATA RESPONSE
======================= */

export type CareerWithCategoryData = {
  id: number;
  jobName: string;
  jobDate: Date;
  category?: {
    idCategory: number;
    nameCategory: string;
    jobType: string;
  };
};

/* =======================
   API RESPONSE
======================= */

export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   MAPPERS
======================= */

function toCareerWithCategory(
  career: Careers & { category?: Category | null },
): CareerWithCategoryData {
  return {
    id: career.id,
    jobName: career.job_name,
    jobDate: career.job_date,
    category: career.category
      ? {
          idCategory: career.category.id,
          nameCategory: career.category.name_category,
          jobType: career.category.job_type,
        }
      : undefined,
  };
}

export function toCareerListResponse(
  careers: (Careers & { category?: Category | null })[],
  message: string,
): ApiResponse<CareerWithCategoryData[]> {
  return {
    message,
    data: careers.map(toCareerWithCategory),
  };
}

export function toCareerResponse(
  career: Careers & { category?: Category | null },
  message: string,
): ApiResponse<CareerWithCategoryData> {
  return {
    message,
    data: toCareerWithCategory(career),
  };
}
