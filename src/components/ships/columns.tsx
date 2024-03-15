import { type ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

import type { ShipOverview } from "@/types/Ship";
import {
  flattenShipData,
  getShipThumbnail,
  replaceAndSanitizeText,
} from "@/lib/utils";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ShipDetail } from "../shipDetail/ship-detail";
import { shipDetailColumns } from "../shipDetail/columns";
import { details } from "@/data/details";

export const shipsColumns: ColumnDef<ShipOverview>[] = [
  {
    accessorKey: "id",
    header: "Ship ID",
    size: 80,
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
            alt={shipName}
          />
          <Dialog>
            <DialogTrigger asChild>
              <a
                className="text-blue-500 hover:text-blue-700 hover:underline text-left"
                // href={`/#/view/${shipId}`}
              >
                {shipName}
              </a>
            </DialogTrigger>
            <ShipDetail
              columns={shipDetailColumns}
              data={flattenShipData(details[parseInt(shipId)])}
              ship={{
                id: shipId,
                name: shipName,
                obtain: details[parseInt(shipId)].obtain,
                note: details[parseInt(shipId)].note,
                specialEffect1: details[parseInt(shipId)].specialEffect1,
                specialEffect2: details[parseInt(shipId)].specialEffect2,
              }}
            />
          </Dialog>
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
    size: 80,
  },
];
