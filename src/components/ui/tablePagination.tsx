import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
// import type { TablePaginationProps } from '@/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface TablePaginationProps {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  className?: string;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  className,
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(start + rowsPerPage - 1, total);

  const [inputPage, setInputPage] = useState<string>('');

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');

      const startPage = Math.max(2, page - 2);
      const endPage = Math.min(totalPages - 1, page + 2);

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const num = Number(inputPage);
  const isValid = !isNaN(num) && num >= 1 && num <= totalPages;

  const handlePageJump = () => {
    if (isValid) {
      onPageChange(num);
      setInputPage('');
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-center sm:justify-between gap-2 mt-3 text-xs text-gray-600 ${className}`}>
      {/* Rows per page */}
      <div className="flex items-center gap-1">
        <span className="hidden sm:inline">Rows:</span>
        <Select
          value={String(rowsPerPage)}
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
        >
          <SelectTrigger className="w-14 h-7 text-xs px-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
             <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Range */}
      <span className="text-center">
        {start}–{end} of {total}
      </span>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={i} className="px-1">
                ...
              </span>
            ) : (
              <Button
                key={i}
                variant={p === page ? 'default' : 'outline'}
                size="sm"
                className="h-7 w-7 p-0 text-xs"
                onClick={() => onPageChange(Number(p))}
              >
                {p}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2"
          disabled={page === totalPages || total === 0}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>

        {/* Jump to page */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value.replace(/\D/g, ''))}
            placeholder="Go"
            className={`w-12 h-7 border rounded px-1 text-xs text-center ${
              inputPage && !isValid ? 'border-red-500' : 'border-gray-300'
            }`}
            min={1}
            max={totalPages}
          />
          <Button
            size="sm"
            className="h-7 px-2 text-xs"
            variant="default"
            onClick={handlePageJump}
            disabled={!isValid}
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
