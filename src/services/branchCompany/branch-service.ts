import { HTTPException } from "hono/http-exception";
import type { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import {
    type CreateBranchRequest,
    type BranchCompanyData,
    type ApiResponse,
    toBranchResponse,
    toBranchCompanyData,
    toBranchListResponse
} from "../../models/branchCompany/branch-model.js";
import { BranchRepository } from "../../repositories/branchCompany/branch-repository.js";

export class BranchService {

// ===============================
// CREATE BRANCH
// ===============================
static async createBranch(
  prisma: PrismaClient,
  request: CreateBranchRequest,
): Promise<ApiResponse<BranchCompanyData>> {

  const company = await prisma.company.findUnique({
    where: { id: request.companyId }
  })

  if (!company) {
    throw new HTTPException(404, {
      message: "Company not found"
    })
  }

  const branch = await BranchRepository.createBranch(prisma, {
    name_branch: request.nameBranch,
    street_address: request.streetAddress,
    link_map: request.linkMap,
    phone: request.phone,
    email: request.email,
    website: request.website,
    company: { connect: { id: request.companyId } }
  })

  return toBranchResponse(branch, 'Branch created successfully')
}

 // ===============================
// GET ALL BRANCHES
// ===============================
 static async getAllBranches(
    prisma: PrismaClient
 ): Promise<ApiResponse<BranchCompanyData[]>>  {
    const branches = await BranchRepository.getAllBranches(prisma)
    
    const page = 1;
    const limit = branches.length;
    const total = branches.length;

    return toBranchListResponse(branches, 'Branches retrieved successfully', page, limit, total)
 }

// ===============================
// GET BRANCH BY ID
// ===============================
 static async getBranchById(
    prisma: PrismaClient,
    id: Number
 ) {
    return BranchRepository.findBranchById(prisma, id);
 }

// ===============================
// UPDATE BRANCH BY ID 
// ===============================
static async updateBranchById(
    prisma: PrismaClient,
    id: Number,
    data: Prisma.BranchCompanyUpdateInput
) {
    return BranchRepository.updateBranchById(prisma, id, data);
}

// ===============================
// DELETE BRANCH BY ID
// ===============================
static async deleteBranchById(
    prisma: PrismaClient,
    id: Number
) {
    return BranchRepository.deleteBranchById(prisma, id);
}


}

   
