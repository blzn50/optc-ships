import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

import { getShipThumbnail, replaceAndSanitizeText } from "@/lib/utils";
import type { ShipOverview } from "@/types/Ship";

export const shipsColumns: ColumnDef<ShipOverview>[] = [
  {
    accessorKey: "id",
    header: "Ship ID",
    size: 80,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const shipId = String(row.getValue("id"));
      const shipName = String(row.getValue("name"));
      const shipIcon = getShipThumbnail(shipId);
      return (
        <div className="flex items-center gap-1">
          <img
            className="w-14 h-14 lazyload"
            loading="lazy"
            data-src={`/${shipIcon}`}
            alt={`${shipName} thumbnail`}
          />
          <Link
            className="text-blue-500 hover:text-blue-700 hover:underline text-left cursor-pointer"
            to={`view/${shipId}`}
          >
            {shipName}
          </Link>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "colaCount",
    header: "Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("colaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <span>{formatted}</span>;
    },
    enableGlobalFilter: false,
    size: 100,
  },
  {
    accessorKey: "superColaCount",
    header: "Super Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("superColaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <span>{formatted}</span>;
    },
    enableGlobalFilter: false,
    size: 125,
  },
  {
    accessorKey: "effect",
    header: "Maxed Effect",
    enableSorting: false,
    cell: ({ row }) => {
      const effectText = String(row.getValue("effect"));
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeText(effectText);
      return <p dangerouslySetInnerHTML={{ __html: text }}></p>;
    },
    size: 300,
  },
  {
    accessorKey: "hasSpecial",
    header: "Special",
    cell: ({ row }) => {
      const shipId = Boolean(row.getValue("hasSpecial"));
      return shipId ? <Check size={16} /> : "-";
    },
    enableGlobalFilter: false,
    size: 80,
  },
];
