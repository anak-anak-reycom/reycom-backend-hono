import type { Admin } from "../../generated/prisma/client.js";


export type createAdminRequest = {
    name_admin: string;
    email: string;
    password: string;
}

export type adminResponse = {
    id_admin: number;
    name_admin: string;
    email: string;
    token?: string;
}

export function toAdminResponse(admin: Admin, token: string): adminResponse {
    return {
        id_admin: admin.id,
        name_admin: admin.name_admin,
        email: admin.email,
    }
}