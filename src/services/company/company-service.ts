import { HTTPException } from 'hono/http-exception';
import type { Prisma, PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateCompanyRequest,
  type CompanyData,
  type ApiResponse,
  type PaginationMeta,
  toCompanyResponse,
  toCompanyData,
  toModelListResponse,
} from '../../models/company/company-model.js';
import { CompanyRepository } from '../../repositories/company/company-repository.js';

export class CompanyService {

  // ===============================
  // CREATE COMPANY
  // ===============================
  static async createCompany(
    prisma: PrismaClient,
    request: CreateCompanyRequest,
  ): Promise<ApiResponse<CompanyData>> {

    const company = await CompanyRepository.createCompany(prisma, {
      name_company: request.name_company,
      country: {
        connect: {
          id: request.countryId,
        },
      },
      
      branches: request.branches && request.branches.length > 0
        ? {
            create: request.branches.map((b) => ({
              name_branch: b.nameBranch,
            })),
          }
        : undefined,
    });

    return toCompanyResponse(company, 'Company created successfully');
  }

  // ===============================
  // GET ALL COMPANIES
  // ===============================
static async getAllCompanies(
  prisma: PrismaClient,
  page: number,
  limit: number
) {

  const skip = (page - 1) * limit

  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      skip,
      take: limit,
      include: { country: true, branches: true }
    }),
    prisma.company.count()
  ])

  return toModelListResponse(
    companies,
    'Companies retrieved successfully',
    toCompanyData,
    page,
    limit,
    total
  )
}

  // ===============================
  // GET COMPANY BY ID
  // ===============================
  static async getCompanyById(
    prisma: PrismaClient,
    id: number
  ) {
    const company = await CompanyRepository.findCompanyById(prisma, id);

    if (!company) {
      throw new HTTPException(404, { message: 'Company not found' });
    }

    return company;
  }

  // ===============================
  // UPDATE COMPANY BY ID
  // ===============================
  static async updateCompanyById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.CompanyUpdateInput
  ) {
    return CompanyRepository.updateCompanyById(prisma, id, data);
  }

  // ===============================
  // DELETE COMPANY BY ID
  // ===============================
  static async deleteCompanyById(
    prisma: PrismaClient,
    id: number
  ) {
    return CompanyRepository.deleteCompanyById(prisma, id);
  }
}
