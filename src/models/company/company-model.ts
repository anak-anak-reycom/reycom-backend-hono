// =====================================
// API RESPONSE GENERIC
// =====================================
export interface ApiResponse<T, M = unknown> {
  success: boolean
  message: string
  data: T
  meta?: M
}

// =====================================
// PAGINATION META
// =====================================
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

// =====================================
// META BUILDER
// =====================================
export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}


// =====================================
// DTO
// =====================================
export interface CreateBranchCompanyRequest {
  nameBranch: string;
}

export interface BranchCompanyData {
  id: number;
  nameBranch: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCompanyRequest = {
  name_company: string;
  countryId?: number;
  branches?: CreateBranchCompanyRequest[];
}

export interface CompanyData {
  id: number;
  nameCompany: string;

  country: {
    id: number;
    nameCountry: string;
    createdAt: Date;
    updatedAt: Date;
  };

  branches: BranchCompanyData[];

  createdAt: Date;
  updatedAt: Date;
}

// =====================================
// MAPPER
// =====================================
export function toBranchData(branch: any): BranchCompanyData {
  return {
    id: branch.id,
    nameBranch: branch.name_branch,
    createdAt: branch.createdAt,
    updatedAt: branch.updatedAt,
  };
}

export function toCompanyData(company: any): CompanyData {
  return {
    id: company.id,
    nameCompany: company.name_company,

    country: {
      id: company.country.id,
      nameCountry: company.country.name_country,
      createdAt: company.country.createdAt,
      updatedAt: company.country.updatedAt,
    },

    branches: company.branches?.map(toBranchData) ?? [],

    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

// =====================================
// RESPONSE
// =====================================
export function toCompanyResponse(
  company: any,
  message: string,
  meta?: Record<string, any>
): ApiResponse<CompanyData> {
  return {
    success: true,
    message,
    data: toCompanyData(company),
    meta
  };
}

export function toModelListResponse<T, R>(
  models: T[],
  message: string,
  mapper: (item: T) => R,
  page: number,
  limit: number,
  total: number
): ApiResponse<R[], PaginationMeta> {
  return {
    success: true,
    message,
    data: models.map(mapper),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}