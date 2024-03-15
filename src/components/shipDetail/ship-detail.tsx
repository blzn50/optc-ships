import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getShipFullImage } from "@/lib/utils";
import type { ShipBasic } from "@/types/Ship";
import {
  ShipDetailTable,
  type ShipDetailTableProps,
} from "./ship-detail-table";

interface ShipDetailProps<TData, TValue>
  extends ShipDetailTableProps<TData, TValue> {
  ship: ShipBasic & {
    name: string;
    id: string;
  };
}

export function ShipDetail<TData, TValue>({
  columns,
  data,
  ship,
}: ShipDetailProps<TData, TValue>) {
  return (
    <DialogContent
      className="h-5/6 overflow-y-auto max-w-6xl"
      showDialogClose={false}
    >
      <DialogHeader className="text-left">
        <DialogTitle>{ship.name}</DialogTitle>
      </DialogHeader>
      <div className="py-3 flex justify-center">
        <img
          className="lazyload min-h-60"
          loading="lazy"
          data-src={`/${getShipFullImage(ship.id)}`}
          alt={ship.name}
        />
      </div>
      <ShipDetailTable data={data} columns={columns} />
    </DialogContent>
  );
}
