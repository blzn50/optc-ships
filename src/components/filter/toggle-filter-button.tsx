import { useStore } from "@nanostores/react";
import { Menu, X } from "lucide-react";
import {
  isFilterOpen,
  toggleIsFilterOpen,
  selectedFilterCount,
} from "@/stores/filterStore";
import { Button } from "@/components/ui/button";

/* Hamburger menu toggle button - visible below xl */
export function ToggleFilterButton() {
  const $isFilterOpen = useStore(isFilterOpen);

  return (
    <Button
      onClick={toggleIsFilterOpen}
      variant="outline"
      size="icon"
      className="relative xl:hidden p-2 shadow-lg"
      aria-label="Toggle filter menu"
    >
      {$isFilterOpen ? <X size={20} /> : <Menu size={20} />}

      {/* Badge for selected filters */}
      {selectedFilterCount.get() > 0 && (
        <span
          id="toggle-filter-button"
          className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
        >
          {selectedFilterCount.get()}
        </span>
      )}
    </Button>
  );
}
