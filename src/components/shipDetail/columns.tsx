import { type ColumnDef } from "@tanstack/react-table";

import type { ShipDetail } from "@/types/Ship";
import {
  replaceAndSanitizeSpecial,
  replaceAndSanitizeEffect,
} from "@/lib/utils";

export const shipDetailColumns: ColumnDef<ShipDetail>[] = [
  {
    id: "colaCount.superColaCount",
    accessorKey: "colaCount",
    header: "Level",
    cell: ({ row }) => row.index + 1,
    size: 10,
  },
  {
    accessorKey: "colaCount",
    header: "Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("colaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <span>{count === 0 ? "-" : formatted}</span>;
    },
    size: 40,
  },
  {
    accessorKey: "superColaCount",
    header: "Super Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("superColaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <span>{count === 0 ? "-" : formatted}</span>;
    },
    size: 60,
  },
  {
    accessorKey: "period",
    header: "Period",
    size: 200,
  },
  {
    accessorKey: "effect",
    header: "Effect",
    enableSorting: false,
    cell: ({ row }) => {
      const effectText = String(row.getValue("effect"));
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeEffect(effectText);
      return <p dangerouslySetInnerHTML={{ __html: text }}></p>;
    },
  },
  {
    accessorKey: "special",
    header: "Special",
    cell: ({ row }) => {
      const special = String(row.getValue("special"));
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeSpecial(special);
      return <p dangerouslySetInnerHTML={{ __html: text }}></p>;
    },
    size: 120,
  },
  {
    accessorKey: "cd",
    header: "CD",
    size: 10,
  },
];
