import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  showQuickJump?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  showQuickJump = false,
  totalItems,
  itemsPerPage,
  className
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className={`pagination ${className || ''}`}>
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="halaman sebelumnya"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="halaman berikutnya"
      >
        <ChevronRight size={16} />
      </button>

      {showInfo && totalItems && itemsPerPage && (
        <div className="pagination-info">
          menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} item
        </div>
      )}

      {showQuickJump && (
        <div className="pagination-jump">
          <span>ke halaman: </span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
            className="pagination-input"
            style={{
              width: '60px',
              padding: '0.25rem 0.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              marginLeft: '0.5rem'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;