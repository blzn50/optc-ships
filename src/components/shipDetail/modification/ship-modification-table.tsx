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

export interface ShipModificationTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ShipModificationTable<TData, TValue>({
  columns,
  data,
}: ShipModificationTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        phase: false,
        cd: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 italic">
        After modification
      </h4>
      <div className="rounded-md border my-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-inherit">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-[#553c2c] border-l border-slate-300 text-slate-50 font-semibold"
                    style={{
                      minWidth: header.getSize(),
                      width: header.getSize() + 20,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                    <TableCell key={cell.id} className="px-2 py-3">
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
    </>
  );
}
