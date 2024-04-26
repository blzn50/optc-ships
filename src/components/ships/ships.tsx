import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { ShipTable } from "@/components/ships/ship-table.tsx";
import { shipsColumns } from "@/components/ships/columns.tsx";
import { units } from "@/data/units";
import { DB_VERSION } from "@/data/version";

// This solution of wrapper component is obtained from github discussion which in turn links to discord thread
// https://github.com/withastro/astro/issues/7709. Table from shadcn is causing issue with hydration if header
// or cell is custom formatted.
export function Ships() {
  useEffect(() => {
    const dbVersion = Number(localStorage.getItem("dbVersion")) || 0;

    if (dbVersion < DB_VERSION) {
      setTimeout(() => {
        toast({
          title: "Update: 26 April 2024",
          description: "10th Anni Ship added.",
        });
      }, 500);
      // update local storage
      localStorage.setItem("dbVersion", DB_VERSION.toString());
      localStorage.setItem("isToastHidden", "false");
    }
  }, []);

  return <ShipTable data={units} columns={shipsColumns} />;
}
