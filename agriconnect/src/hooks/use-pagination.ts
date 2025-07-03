import { useState, useEffect } from "react";

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  onPageChange?: (page: number) => void;
}

export const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
  onPageChange,
}: UsePaginationProps = {}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(page, prev.totalPages)),
    }));
    onPageChange?.(page);
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  const setTotal = (total: number) => {
    setPagination((prev) => {
      const totalPages = Math.ceil(total / prev.limit);
      return {
        ...prev,
        total,
        totalPages,
        hasNext: prev.page < totalPages,
        hasPrev: prev.page > 1,
      };
    });
  };

  const nextPage = () => {
    if (pagination.hasNext) {
      setPage(pagination.page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.hasPrev) {
      setPage(pagination.page - 1);
    }
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

  const reset = () => {
    setPagination({
      page: initialPage,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    });
  };

  useEffect(() => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    setPagination((prev) => ({
      ...prev,
      totalPages,
      hasNext: prev.page < totalPages,
      hasPrev: prev.page > 1,
    }));
  }, [pagination.total, pagination.limit, pagination.page]);

  return {
    ...pagination,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
};
