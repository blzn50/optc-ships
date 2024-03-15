import { ShipTable } from "@/components/ships/ship-table.tsx";
import { shipsColumns } from "@/components/ships/columns.tsx";

import { units } from "@/data/units";

// This solution of wrapper component is obtained from github discussion which in turn links to discord thread
// https://github.com/withastro/astro/issues/7709. Table from shadcn is causing issue with hydration if header
// or cell is custom formatted.
export function Ships() {
  return <ShipTable data={units} columns={shipsColumns} />;
}
