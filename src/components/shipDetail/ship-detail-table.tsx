import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import type { ShipDetail } from "@/types/Ship";

export interface ShipDetailTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ShipDetailTable<TData, TValue>({
  columns,
  data,
}: ShipDetailTableProps<TData, TValue>) {
  const ship = useMemo(() => {
    return data[0] as ShipDetail;
  }, [data[0]]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        colaCount: "colaCount" in ship,
        superColaCount: "superColaCount" in ship,
        period: "period" in ship,
        effect: "effect" in ship,
        special: "special" in ship,
        cd: "cd" in ship,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-inherit">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="p-2"
                  style={{
                    minWidth: header.getSize(),
                    width: header.getSize() + 20,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <span className="text-foreground flex items-center justify-between font-semibold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="odd:hover:bg-inherit odd:even:bg-muted/50 odd:bg-inherit even:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
