import { PrismaClient, Prisma } from "../../generated/prisma/client.js";

export class CareerRepository {
  
   static async countByNameCareer(
        prisma: PrismaClient,
        job_name: string,
    ) {
        return prisma.careers.count({
            where: { job_name },
     });
}

  static createCareer(
    prisma: PrismaClient,
    data: Prisma.CareersCreateInput
  ) {
    return prisma.careers.create({ data });
  }

  static async findByNameCareer(
    prisma: PrismaClient,
    job_name: string,
  ) {
    return prisma.careers.findFirst({
      where: { job_name },
    });
  }

  
}

    