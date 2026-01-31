import type { Applys } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateApplyRequest = {
    nameApply: string;
    emailApply: string;
    phoneNumberApply: string;
    gender: string;
    domicile: string;
    resume: string;
};

/* =======================
   DATA RESPONSE (SINGLE)
======================= */
export type ApplyData = {
    idApply: number;
    nameApply: string;
    emailApply: string;
    phoneNumberApply: string;
    gender: string;
    domicile: string;
    resume: string;
    createdAt?: Date;
    updatedAt?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T;
};

export function toApplyData(apply: Applys): ApplyData {
    return {
        idApply: apply.id,
        nameApply: apply.name_apply,
        emailApply: apply.email,
        phoneNumberApply: apply.no_hp,
        gender: apply.gender,
        domicile: apply.domicile,
        resume: apply.resume,
        createdAt: apply.created_at,
        updatedAt: apply.updated_at,
    };
}

export function toApplyResponse(
    apply: Applys,
    message: string
): ApiResponse<ApplyData> {
    return {
        message,
        data: toApplyData(apply),
    };
}

export function toApplyListResponse(
    applys: Applys[],
    message: string
): ApiResponse<ApplyData[]> {
    return {
        message,
        data: applys.map(toApplyData),
    };
}
