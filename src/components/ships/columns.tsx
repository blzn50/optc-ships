import { type ColumnDef } from "@tanstack/react-table";

import type { ShipOverview } from "@/types/Ship";

export const columns: ColumnDef<ShipOverview>[] = [
  {
    accessorKey: "id",
    header: "Ship Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "colaCount",
    header: "Cola Needed",
  },
  { accessorKey: "superColaCount", header: "Super Cola Needed" },
  {
    accessorKey: "effect",
    header: "Maxed Effect",
  },
  {
    accessorKey: "hasSpecial",
    header: "Special",
  },
];
