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
    header: () => <div className="text-right pr-1">Level</div>,
    cell: ({ row }) => <div className="text-right pr-1">{row.index + 1}</div>,
    size: 10,
  },
  {
    accessorKey: "colaCount",
    header: () => <div className="text-right pr-1">Cola Needed</div>,
    cell: ({ row }) => {
      const count = parseInt(row.getValue("colaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return (
        <div className="text-right pr-1">{count === 0 ? "-" : formatted}</div>
      );
    },
    size: 40,
  },
  {
    accessorKey: "superColaCount",
    header: "Super Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("superColaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return (
        <div className="text-right pr-1">{count === 0 ? "-" : formatted}</div>
      );
    },
    size: 60,
  },
  {
    accessorKey: "period",
    header: "Period",
    size: 160,
  },
  {
    accessorKey: "effect",
    header: () => <div className="pl-1">Effect</div>,
    enableSorting: false,
    cell: ({ row }) => {
      const effectText = String(row.getValue("effect"));
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeEffect(effectText);
      return (
        <p className="pl-1" dangerouslySetInnerHTML={{ __html: text }}></p>
      );
    },
    minSize: 210,
  },
  {
    accessorKey: "special",
    header: () => <div className="pl-1">[CD] Special</div>,
    cell: ({ row }) => {
      const special = String(row.getValue("special"));
      const cd = row.getValue("cd");
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeEffect(replaceAndSanitizeSpecial(special));
      return (
        <p
          className="pl-1"
          dangerouslySetInnerHTML={{
            __html: `${cd !== "-" ? `<div>[ <b>${cd} turns</b> ]</div>` : ""} ${text}`,
          }}
        ></p>
      );
    },
    size: 180,
  },
  {
    accessorKey: "cd",
  },
];
