import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import * as React from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  page?: number;
  setPage?: (page: number) => void;
  totalPages?: number;
  isPagination?: boolean;
  limit?: number;
  setLimit?: (limit: number) => void;
}

export function DataTable<TData>({
  columns,
  data,
  page = 1,
  setPage = () => {},
  totalPages = 1,
  isPagination = true,
  limit = 5,
  setLimit = () => {},
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [jumpPage, setJumpPage] = React.useState<number>(page);

  // Helper to generate page numbers for pagination (always show 5 numbers if possible)
  const getPaginationItems = (): number[] => {
    const items: number[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else if (page <= 3) {
      for (let i = 1; i <= 5; i++) {
        items.push(i);
      }
    } else if (page >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        items.push(i);
      }
    }
    return items;
  };

  const paginationItems = getPaginationItems();

  React.useEffect(() => {
    setJumpPage(page);
  }, [page]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-100">
                {headerGroup.headers.map((header, idx, arr) => {
                  // Only show first, second, and last columns on mobile
                  const isAlwaysVisible =
                    idx === 0 || idx === 1 || idx === arr.length - 1;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "bg-gray-50/80 text-gray-600 font-semibold text-sm tracking-wide py-4 px-6 text-left border-b border-gray-100",
                        isAlwaysVisible ? "" : "hidden md:table-cell"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50/50",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  )}
                >
                  {row.getVisibleCells().map((cell, idx, arr) => {
                    const isAlwaysVisible =
                      idx === 0 || idx === 1 || idx === arr.length - 1;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "py-4 px-6 text-gray-800 font-medium",
                          isAlwaysVisible ? "" : "hidden md:table-cell"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500 font-medium"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {isPagination && (
        <div className="flex flex-col px-6 py-4 sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/30">
          {/* Rows per page selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
              Rows per page:
            </span>
            <Select 
              value={String(limit)} 
              onValueChange={(val: string) => setLimit(Number(val))}
            >
              <SelectTrigger className="w-20 bg-white h-9 border-gray-200 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[5, 10, 15, 20, 50, 70, 100].map((opt: number) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Page Info and Navigation */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Page {page} of {totalPages}
              </span>
              
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  disabled={page === 1}
                  className="h-9 w-9 flex items-center justify-center rounded-l-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setJumpPage(Number(e.target.value))
                  }
                  onBlur={() => {
                    let val = Number(jumpPage);
                    if (val >= 1 && val <= totalPages && val !== page)
                      setPage(val);
                    setJumpPage(page);
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      let val = Number(jumpPage);
                      if (val >= 1 && val <= totalPages && val !== page)
                        setPage(val);
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  className="w-16 h-9 border-y border-gray-200 text-center text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Go to page"
                  style={{ MozAppearance: "textfield" }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  disabled={page === totalPages}
                  className="h-9 w-9 flex items-center justify-center rounded-r-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Page Number Links */}
            <Pagination className="flex justify-center sm:justify-end">
              <PaginationContent className="flex gap-1">
                {paginationItems.map((item: number) => (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200",
                        item === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      )}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}