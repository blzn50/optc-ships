import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getShipFullImage, flattenShipData } from "@/lib/utils";
import { ShipDetailTable } from "./ship-detail-table";
import { details } from "@/data/details";
import { shipDetailColumns } from "./columns";
import { useMemo } from "react";

export function ShipDetail() {
  let navigate = useNavigate();
  const { shipId } = useParams();

  if (!shipId) {
    return null;
  }

  const ship = useMemo(() => {
    const tempShip = details[parseInt(shipId)];

    return {
      id: shipId,
      name: tempShip.name,
      obtain: tempShip.obtain,
      note: tempShip.note,
      specialEffect1: tempShip.specialEffect1,
      specialEffect2: tempShip.specialEffect2,
    };
  }, [shipId]);

  const data = useMemo(() => {
    return flattenShipData(details[parseInt(shipId)]);

    return [];
  }, [shipId]);

  return (
    <Dialog open onOpenChange={() => navigate("/")}>
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
        <ShipDetailTable data={data} columns={shipDetailColumns} />
      </DialogContent>
    </Dialog>
  );
}
