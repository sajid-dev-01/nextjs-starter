import { type Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface DataTableOffsetPaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  pageNeighbour?: number;
}

export function DataTableOffsetPagination<TData>({
  table,
  pageSizeOptions = [1, 10, 20, 30, 40, 50],
  pageNeighbour = 2,
}: DataTableOffsetPaginationProps<TData>) {
  const totalPage = table.getPageCount();
  const currentPage = Math.min(
    totalPage,
    table.getState().pagination.pageIndex + 1
  );

  return (
    <div className="flex flex-col-reverse flex-wrap items-center justify-between gap-4 p-1 sm:flex-row sm:gap-6 lg:gap-8">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 min-w-16">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-sm font-medium">
        Page {currentPage} of {totalPage}
      </div>
      <div className="flex items-center gap-2">
        <Button
          aria-label="Go to first page"
          variant="outline"
          className="hidden size-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeftIcon className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to previous page"
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="size-4" aria-hidden="true" />
        </Button>
        {totalPage > 0 && Boolean(pageNeighbour) && pageNeighbour && (
          <>
            {Array(Math.min(currentPage - 1, pageNeighbour))
              .fill(true)
              .map((_, idx, arr) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() =>
                    table.setPageIndex(currentPage + idx - arr.length - 1)
                  }
                >
                  {currentPage + idx - arr.length}
                </Button>
              ))}
            <Button disabled className="size-8 p-0">
              {currentPage}
            </Button>
            {Array(Math.min(Math.abs(totalPage - currentPage), pageNeighbour))
              .fill(true)
              .map((_, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => table.setPageIndex(currentPage + idx)}
                >
                  {currentPage + idx + 1}
                </Button>
              ))}
          </>
        )}
        <Button
          aria-label="Go to next page"
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to last page"
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => table.setPageIndex(totalPage - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRightIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
