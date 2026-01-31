import type { Admin } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateAdminRequest = {
    nameAdmin: string;
    emailAdmin: string;
    passwordAdmin: string;
};

export type LoginAdminRequest = {
    nameAdminn: string;
    passwordAdmin: string;
};

export type LogoutAdminRequest = {
    idAdmin: number;
};

/* =======================
   DATA RESPONSE
======================= */
export type AdminData = {
    idAdmin: number;
    nameAdmin: string;
    emailAdmin: string;
    token?: string;
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

export function toAdminData(
    admin: Admin,
    token?: string
): AdminData {
    return {
        idAdmin: admin.id,
        nameAdmin: admin.name_admin,
        emailAdmin: admin.email,
        token,
        createdAt: admin.created_at,
        updatedAt: admin.updated_at,
    };
}
export function toAdminListResponse(
    applys: Admin[],
    message: string
): ApiResponse<AdminData[]> {
    return {
        message,
        data: applys.map((admin) => toAdminData(admin)),
    };
}


export function toAdminResponse(
    admin: Admin,
    message: string,
    token?: string
): ApiResponse<AdminData> {
    return {
        message,
        data: toAdminData(admin, token),
    };
}
