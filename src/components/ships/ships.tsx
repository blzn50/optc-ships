import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import { toast } from '@/components/ui/use-toast';
import { ShipTable } from '@/components/ships/ship-table.tsx';
import { shipsColumns } from '@/components/ships/columns.tsx';
import { FilterComponent } from '@/components/filter/filter.tsx';
import { units } from '@/data/units';
import { DB_VERSION } from '@/data/version';
import { $filterStateArray, filterShips } from '@/stores/filterStore';

// This solution of wrapper component is obtained from github discussion which in turn links to discord thread
// https://github.com/withastro/astro/issues/7709. Table from shadcn is causing issue with hydration if header
// or cell is custom formatted.
export function Ships() {
  const filterState = useStore($filterStateArray);

  useEffect(() => {
    const dbVersion = Number(localStorage.getItem('dbVersion')) || 0;

    if (dbVersion < DB_VERSION) {
      setTimeout(() => {
        toast({
          title: 'Update: 24 Apr 2026',
          description: '12th anni ship added',
        });
      }, 500);
      // update local storage
      localStorage.setItem('dbVersion', DB_VERSION.toString());
      localStorage.setItem('isToastHidden', 'false');
    }
  }, []);

  // Filter ships based on current filter state
  const filteredShips = filterShips(units, filterState);

  // Create a unique key based on filter state to force re-render
  const tableKey = JSON.stringify(filterState) + filteredShips.length;

  return (
    <div className="xl:grid xl:gap-2 xl:grid-cols-4">
      <div className="relative col-span-1">
        <FilterComponent />
      </div>
      <div className="col-span-3">
        <ShipTable key={tableKey} data={filteredShips} columns={shipsColumns} />
      </div>
    </div>
  );
}
