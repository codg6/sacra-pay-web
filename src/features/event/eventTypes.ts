export interface EventResponse {
  id: string
  name: string
  startDate: string | null
  endDate: string | null
  organizationId: string
  organizationName: string
  createdAt: string
  updatedAt: string
}

export interface EventSummary {
  name: string
  startDate: string | null
  endDate: string | null
  createdAt: string
  cardCount: number
  transactionCount: number
  totalAmount: number
}