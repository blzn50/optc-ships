import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Check, CheckCheck, Minus } from "lucide-react";

import { getShipThumbnail, replaceAndSanitizeEffect } from "@/lib/utils";
import type { ShipOverview } from "@/types/Ship";

export const shipsColumns: ColumnDef<ShipOverview>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-right">Ship ID</div>,
    size: 80,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <div className="text-right pr-1">{row.getValue("id")}</div>
    ),
    enableHiding: false,
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
    enableHiding: false,
    size: 200,
  },
  {
    accessorKey: "colaCount",
    meta: { displayLabel: "Cola count" },
    header: () => <div className="text-right pr-1">Cola Needed</div>,
    cell: ({ row }) => {
      const count = parseInt(row.getValue("colaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <div className="text-right pr-1">{formatted}</div>;
    },
    enableGlobalFilter: false,
    size: 100,
  },
  {
    accessorKey: "superColaCount",
    meta: { displayLabel: "Super cola count" },
    header: () => <div className="text-right pr-1">Super Cola Needed</div>,
    cell: ({ row }) => {
      const count = parseInt(row.getValue("superColaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return <div className="text-right pr-1">{formatted}</div>;
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
      const text = replaceAndSanitizeEffect(effectText);
      return (
        <p className="pl-1" dangerouslySetInnerHTML={{ __html: text }}></p>
      );
    },
    enableHiding: false,
    size: 300,
  },
  {
    accessorKey: "hasSpecial",
    header: "Special",
    cell: ({ row }) => {
      const specialVal = row.getValue("hasSpecial");
      return specialVal === "yes" ? (
        <CheckCheck size={16} />
      ) : specialVal === "afterMRank5" ? (
        <Check size={16} />
      ) : (
        <Minus size={16} />
      );
    },
    enableGlobalFilter: false,
    enableHiding: false,
    size: 80,
  },
];
