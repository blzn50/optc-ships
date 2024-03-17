import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  getShipFullImage,
  flattenShipData,
  replaceAndSanitizeEffect,
} from "@/lib/utils";
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
  }, [shipId]);

  return (
    <Dialog open onOpenChange={() => navigate("/")}>
      <DialogContent
        className="h-5/6 overflow-y-auto w-11/12 max-w-6xl pt-0 max-md:px-4 border-none"
        showDialogClose={false}
      >
        <DialogHeader className="sticky top-0 z-40 py-6 max-md:py-4 text-left bg-white dark:bg-black">
          <DialogTitle>{ship.name}</DialogTitle>
        </DialogHeader>
        <div className="py-3 flex justify-center">
          <img
            className="lazyload min-h-10 md:min-h-60"
            loading="lazy"
            data-src={`/${getShipFullImage(ship.id)}`}
            alt={ship.name}
          />
        </div>
        {!!ship.obtain && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>How to obtain:</b> {ship.obtain}
          </blockquote>
        )}
        {!!ship.note && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Note:</b> {ship.note}
          </blockquote>
        )}
        {!!ship.specialEffect1 && (
          <p className="font-light text-center text-sm text italic p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800">
            <b>Criteria for special effect:</b> Ship at lvl. 12 can be modified
            to add further stat modifiers. Special effect 1 is obtained at
            modification rank 4 or above for all HP/ATK/RCV. Special effect 2 is
            obtained at modification rank 5 for all HP/ATK/RCV.
          </p>
        )}
        {!!ship.specialEffect1 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Special Effect 1:</b>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeEffect(ship.specialEffect1),
              }}
            ></span>
          </blockquote>
        )}
        {!!ship.specialEffect2 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Special Effect 2:</b>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeEffect(ship.specialEffect2),
              }}
            ></span>
          </blockquote>
        )}
        <ShipDetailTable data={data} columns={shipDetailColumns} />
      </DialogContent>
    </Dialog>
  );
}
