import type {
  BranchCompany,
  Company,
  Country
} from "../../generated/prisma/client.js"

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

//
// =======================
// REQUEST
// =======================
//

export type CreateCountryRequest = {
  name_country: string
}

//
// =======================
// RESPONSE DATA DTO
// =======================
//

export type BranchCompanyData = {
  id: number
  nameBranch: string
  streetAddress?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
}

export type CompanyData = {
  id: number
  nameCompany: string
  branches: BranchCompanyData[]
}

export type CountryData = {
  id: number
  nameCountry: string
  companies: CompanyData[]
  createdAt: Date
  updatedAt: Date
}

//
// =======================
// MAPPERS
// =======================
//

function toBranchCompanyData(branch: BranchCompany): BranchCompanyData {
  return {
    id: branch.id,
    nameBranch: branch.name_branch,
    streetAddress: branch.street_address,
    phone: branch.phone,
    email: branch.email,
    website: branch.website,
  }
}

function toCompanyData(
  company: Company & { branches?: BranchCompany[] }
): CompanyData {
  return {
    id: company.id,
    nameCompany: company.name_company,
    branches: company.branches?.map(toBranchCompanyData) ?? [],
  }
}

export function toCountryData(
  country: Country & {
    companies?: (Company & { branches?: BranchCompany[] })[]
  }
): CountryData {
  return {
    id: country.id,
    nameCountry: country.name_country,
    companies: country.companies?.map(toCompanyData) ?? [],
    createdAt: country.createdAt,
    updatedAt: country.updatedAt,
  }
}

//
// =======================
// RESPONSE WRAPPERS
// =======================
//

export function toCountryResponse(
  country: Country & {
    companies?: (Company & { branches?: BranchCompany[] })[]
  },
  message: string
): ApiResponse<CountryData> {
  return {
    success: true,
    message,
    data: toCountryData(country),
  }
}

export function toModelListResponse<T, U>(
  items: T[],
  message: string,
  mapper: (item: T) => U,
  page: number,
  limit: number,
  total: number
): ApiResponse<U[], PaginationMeta> {
  return {
    success: true,
    message,
    data: items.map(mapper),
    meta: buildPaginationMeta(page, limit, total),
  }
}