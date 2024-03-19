import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type FilterFn,
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
} from "../ui/select";
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

export function ShipTable<TData, TValue>({
  columns,
  data,
}: ShipTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: false,
    },
  ]);

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
    },
    globalFilterFn: fuzzyFilter,
    enableSortingRemoval: false,
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowUp className="h-4 w-4" />,
                          desc: <ArrowDown className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? (
                          <ArrowUpDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        )}
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
              onValueChange={(val) => table.setPageSize(Number(val))}
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
