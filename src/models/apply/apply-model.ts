import type { Applys } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateApplyRequest = {
    name_apply: string;
    email: string;
    no_hp: string;
    gender: string;
    domicile: string;
    resume: string;
};

/* =======================
   DATA RESPONSE (SINGLE)
======================= */
export type ApplyData = {
    id_apply: number;
    name_apply: string;
    email: string;
    no_hp: string;
    gender: string;
    domicile: string;
    resume: string;
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

export function toApplyData(apply: Applys): ApplyData {
    return {
        id_apply: apply.id,
        name_apply: apply.name_apply,
        email: apply.email,
        no_hp: apply.no_hp,
        gender: apply.gender,
        domicile: apply.domicile,
        resume: apply.resume,
        created_at: apply.created_at,
        updated_at: apply.updated_at,
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
