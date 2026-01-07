import type { Careers } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateCareerRequest = {
    job_date: Date;
    job_name: string;
};

/* =======================
   DATA RESPONSE
======================= */
export type CareerData = {
    id_career: number;
    job_date: Date;
    job_name: string;
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
