import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type FilterFn,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useStore } from "@nanostores/react";
import "lazysizes";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchVal } from "@/searchStore";

interface ShipTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, _) => {
  const toMatch = new RegExp(value, "i");
  const itemRank = (row.getValue(columnId) as string).search(toMatch);
  return itemRank > -1;
};

const numberColumns = ["id", "colaCount", "superColaCount"];

export function ShipTable<TData, TValue>({
  columns,
  data,
}: ShipTableProps<TData, TValue>) {
  const paginationPageSize = localStorage.getItem("pagination.pageSize");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: Number(paginationPageSize) || 15,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: false,
    },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const $searchVal = useStore(searchVal);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      pagination,
      globalFilter: $searchVal,
      columnVisibility,
    },
    globalFilterFn: fuzzyFilter,
    enableSortingRemoval: false,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: searchVal.set,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  return (
    <div>
      <div className="flex my-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" size="sm">
              Toggle columns
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((colToFilter) => colToFilter.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.columnDef.meta?.displayLabel}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-inherit">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`p-2 ${header.index % 2 === 0 ? "bg-muted/50" : "bg-inherit"}`}
                    style={{
                      minWidth: header.getSize(),
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <span className="text-foreground flex items-center justify-between cursor-pointer font-semibold hover:underline">
                        {numberColumns.includes(header.id) &&
                          ({
                            asc: <ArrowUp className="h-4 w-4" />,
                            desc: <ArrowDown className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowUpDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ))}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {!numberColumns.includes(header.id) &&
                          ({
                            asc: <ArrowUp className="h-4 w-4" />,
                            desc: <ArrowDown className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowUpDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ))}
                      </span>
                    ) : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-inherit">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`p-2 ${cell.column.getIndex() % 2 === 0 ? "bg-muted/50" : "bg-inherit"}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="sticky bottom-0 z-40 bg-white dark:bg-black">
        <div className="flex items-center justify-end space-x-2 h-14">
          <div className="flex-1 text-sm">
            Showing {pagination.pageIndex + 1} to{" "}
            {table.getFilteredRowModel().rows.length < pagination.pageSize
              ? table.getFilteredRowModel().rows.length
              : pagination.pageSize * (pagination.pageIndex + 1)}{" "}
            of {table.getFilteredRowModel().rows.length}{" "}
            {table.getFilteredRowModel().rows.length === 1
              ? "entry"
              : "entries"}
            {!!$searchVal &&
              ` (filtered from ${table.getPreFilteredRowModel().rows.length} total
            entries)`}
          </div>
          <div className="space-x-2">
            <Select
              onValueChange={(val) => {
                table.setPageSize(Number(val));
                localStorage.setItem("pagination.pageSize", val);
              }}
              defaultValue={table.getState().pagination.pageSize.toString()}
            >
              <SelectTrigger className="w-[80px] h-9 inline-flex">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {["15", "25", "50", "100"].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
