export * from './auth'

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Common UI types
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}