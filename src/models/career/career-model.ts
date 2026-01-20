import type { Careers } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateCareerRequest = {
    job_date: Date;
    job_name: string;
    career?: {
    title: string;
    description: string;
  }[];
};

/* =======================
   DATA RESPONSE
======================= */
export type CareerData = {
    id_career: number;
    job_date: Date;
    job_name: string;
    created_at?: Date;
    updated_at?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T;
};

export function toCareerData(
    career: Careers
): CareerData {
    return {
        id_career: career.id,
        job_date: career.job_date,
        job_name: career.job_name,
        created_at: career.created_at,
        updated_at: career.updated_at,
    };
}

export function toCareerResponse(
    career: Careers,
    message: string
): ApiResponse<CareerData> {
    return {
        message,
        data: toCareerData(career),
    };
}

export function toCareerListResponse(
    careers: Careers[],
    message: string
): ApiResponse<CareerData[]> {
    return {
        message,
        data: careers.map(toCareerData),
    };
}
