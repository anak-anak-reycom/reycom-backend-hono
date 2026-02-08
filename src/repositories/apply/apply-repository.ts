import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";
import { applyValidation } from "../../validations/apply/apply-validation.js";
import type { CreateApplyRequest } from "../../models/apply/apply-model.js";

export class ApplyRepository {

    static async countByNameApplication(
        prisma: PrismaClient,
        name_apply: string,
    ) {
        return prisma.applys.count({
            where: { name_apply },
        });
    } 
    
    static async createApplication(
        prisma: PrismaClient,
        data: CreateApplyRequest
    ) {
        const payload: Prisma.ApplysCreateInput = {
            name_apply: data.nameApply,
            email: data.emailApply,
            no_hp: data.phoneNumberApply,
            gender: data.gender,
            domicile: data.domicile,
            resume: data.resume,
        };

        return prisma.applys.create({ data: payload });
    }
    
    static async findApplicationByName(
        prisma: PrismaClient,
        name_apply: string,
    ) {
        return prisma.applys.findFirst({
            where: { name_apply },
        });
    }
    
    static async getAllApplications(
        prisma: PrismaClient,
    ) {
        return prisma.applys.findMany();
    }
    
    static async findApplicationById(
        prisma: PrismaClient,
        id: number,
    ) {
        return prisma.applys.findUnique({
            where: { id },
        });
    }

    static async updateApplicationById(
        prisma: PrismaClient,
        id: number,
        data: Prisma.ApplysUpdateInput,
    ) {
        return prisma.applys.update({
            where: { id },
            data,
        });
    }

    static async deleteApplicationById(
        prisma: PrismaClient,
        id: number,
    ) {
        return prisma.applys.delete({
            where: { id },
        });
    }
}