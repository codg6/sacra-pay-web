// Equivalente EXATO ao organization.model.ts que tínhamos no Angular.
// Interfaces TypeScript funcionam de forma idêntica nos dois frameworks —
// isso aqui não muda nada entre Angular e React.

export interface OrganizationRequest {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSummary {
  userCount: number
  eventCount: number
  cardCount: number
  billingStatus: string | null
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}