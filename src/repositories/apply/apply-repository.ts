import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";
import { applyValidation } from "../../validations/apply/apply-validation.js";

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
        PrismaClient : PrismaClient,
        data: Prisma.ApplysCreateInput
    ) {
        return PrismaClient.applys.create({ data });
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