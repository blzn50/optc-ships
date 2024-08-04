import { type ColumnDef } from "@tanstack/react-table";

import type { ShipModificationEffect } from "@/types/Ship";
import {
  replaceAndSanitizeSpecial,
  replaceAndSanitizeEffect,
} from "@/lib/utils";

export const shipModificationDetailColumns: ColumnDef<ShipModificationEffect>[] =
  [
    {
      accessorKey: "phase",
    },
    {
      accessorKey: "effect",
      header: () => <div className="pl-1">[Modification] Effect</div>,
      enableSorting: false,
      cell: ({ row }) => {
        const effectText = String(row.getValue("effect"));
        const phase = row.getValue("phase");
        // if needed, sanitize the val with js-xss or dompurify
        const text = replaceAndSanitizeEffect(effectText);
        return (
          <p
            className="pl-1"
            dangerouslySetInnerHTML={{
              __html: `<div>[ <b>Phase ${phase}</b> ]</div> ${text}`,
            }}
          ></p>
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
        const text = replaceAndSanitizeSpecial(special);
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
