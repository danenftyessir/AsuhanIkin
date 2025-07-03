export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  filter?: Record<string, any>;
}

export interface AuthResponse {
  user: any;
  token: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface UploadResponse {
  url: string;
  fileName: string;
  size: number;
  type: string;
}
