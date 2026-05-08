import { atom } from 'nanostores';
import { filterMatcher } from '@/lib/matcher';
import type { ShipOverview } from '@/types/Ship';
import type {
  FilterHierarchy,
  FilterSetArray,
  FilterState,
} from '@/types/Filter';

export const isFilterOpen = atom(false);

export const selectedFilterCount = atom(0);

export const toggleIsFilterOpen = () => isFilterOpen.set(!isFilterOpen.get());

// Atoms for our filter state
export const $filterStateArray = atom<FilterSetArray>([]);

// Function to add a new filter set
export const addFilter = (filterState: FilterState) => {
  const currentFilters = $filterStateArray.get();
  $filterStateArray.set([
    ...currentFilters,
    {
      id: filterState.id,
      category: filterState.category || null,
      subcategory: filterState.subcategory || null,
      effectType: filterState.effectType || null,
      turnCount: filterState.turnCount || null,
    },
  ]);
};

// Function to update a specific filter set by id
export const updateFilter = (id: string, filterState: Partial<FilterState>) => {
  const currentFilters = $filterStateArray.get();

  const updatedFilters = currentFilters.map((filter) => {
    if (filter.id === id) {
      return { ...filter, ...filterState };
    }
    return filter;
  });

  $filterStateArray.set(updatedFilters);
};

// Function to remove a filter set by id
export const removeFilter = (id: string) => {
  const currentFilters = $filterStateArray.get();

  $filterStateArray.set(currentFilters.filter((filter) => filter.id !== id));
};

// Function to clear all filters
export const clearFilters = () => {
  $filterStateArray.set([]);
};

// Function to reset a specific filter to defaults
// export const resetFilter = (index: number) => {
//   updateFilter(index, {
//     category: null,
//     subcategory: null,
//     effectType: null,
//     turnCount: null,
//   });
// };

// Define our filter hierarchy with better structure
export const FILTER_HIERARCHY: FilterHierarchy = {
  ability: {
    'beneficial-team-effect': [
      'reduce special charge',
      'hp',
      'land perfect strikes',
      'orb chance booster',
      'change orbs',
      'percent damage reduction',
      'heal eot',
    ],
    'reduce-status-effect': [
      'bind',
      'despair',
      'special bind',
      'atk down',
      'paralysis',
      'decrease chain multiplier growth rate',
      'special reverse',
      'limit special uses',
    ],
    'boost-damage': ['atk', 'poison damage boost', 'delayed damage boost', 'def down damage boost'],
    'fixed-damage': ['end of turn damage'],
  },
  special: {
    'beneficial-team-effect': [
      'reduce special charge',
      'change orbs',
      'lock orbs',
      'reduce switch effect',
      'threshold damage reduction',
      'percent damage reduction',
      'heal',
      'heal eot',
      'hp guard',
    ],
    'fixed-damage': ['instant damage', 'percent damage'],
    'boost-damage': [
      'base atk',
      'atk',
      'color affinity',
      'slot',
      'final tap atk',
      'orb effect multiplier',
      'additive chain multiplier',
      'chain multiplier growth',
      'percent damage boost',
      'ignited damage boost',
      'def down damage boost',
    ],
    'reduce-status-effect': [
      'bind',
      'despair',
      'atk down',
      'paralysis',
      'slot bind',
      'burn',
      'eot heal to damage',
    ],
    'reduce-enemy-effect': [
      'def up',
      'enemy percent damage',
      'enemy threshold damage',
      'barrier',
      'resilience',
    ],
    'apply-enemy-effect': [
      'enemy def down',
      'delay',
      'negative resistance',
      'enemy paralysis',
    ],
  },
};

// Helper function to check if a string contains another string (case insensitive)
const searchForCondition = (
  textToSearch: string | undefined,
  searchText: string,
  regExpression: RegExp,
  options: {
    matchAnyTurns: boolean;
  },
): boolean => {
  const { matchAnyTurns } = options;
  if (!textToSearch) return false;
  // Extract condition and turn count from search text
  const searchMatch = searchText.match(regExpression);

  // console.log({ searchText, searchMatch, textToSearch, regExpression });

  if (!searchMatch) return false;

  // Handle cases where first capture group might be undefined (for reduce special charge)
  const searchCondition = searchMatch[1] ? searchMatch[1].trim() : '';
  const searchTurns = matchAnyTurns
    ? null
    : searchMatch[2]
      ? parseInt(searchMatch[2], 10)
      : null;

  // Find all matches in the target text
  const regex = new RegExp(regExpression.source, 'gi');
  regex.lastIndex = 0;
  let match;

  while ((match = regex.exec(textToSearch)) !== null) {
    // console.log("regex.exec(textToSearch)", regex.exec(textToSearch));
    // console.log({ match });
    const [, conditionsPart, turnsCount] = match;
    const turns = parseInt(turnsCount, 10);

    // Check turn count if not matching any turns
    if (!matchAnyTurns && turns !== searchTurns) continue;

    // Check if the search condition appears in the conditions part
    // We need to handle cases like:
    // - searchCondition = "bind", conditionsPart = "Bind/Despair" → should match
    // - searchCondition = "bind", conditionsPart = "Special Bind" → should NOT match
    // - searchCondition = "special bind", conditionsPart = "Special Bind/Bind" → should match
    // - searchCondition = "special bind", conditionsPart = "Bind" → should NOT match

    // Check if search condition appears as a separate item
    const conditionParts = conditionsPart
      ? conditionsPart.split('/').map((part) => part.trim())
      : [];

    // For "reduce special charge" (when searchCondition is empty),
    // we return true regardless of conditionsPart
    if (!searchCondition) {
      return true;
    }

    // Check if search condition appears in any part
    for (const part of conditionParts) {
      // If the part exactly equals the search condition (for both single and multi-word)
      if (part === searchCondition) {
        return true;
      }

      // If search condition is a single word, check if it appears as a word in the part
      // if (!searchCondition.includes(" ")) {
      //   const words = part.split(/\s+/);
      //   if (words.includes(searchCondition)) {
      //     return true;
      //   }
      // }
    }
  }

  return false;
};

// Filter function with improved logic and extensibility
export const filterShips = (
  ships: ShipOverview[],
  filterStateArray: FilterSetArray,
): ShipOverview[] => {
  // If no filters applied, return all ships
  const hasActiveFilters = filterStateArray.some(
    (filter) =>
      filter.category !== null ||
      filter.subcategory !== null ||
      filter.effectType !== null ||
      filter.turnCount !== null,
  );

  if (!hasActiveFilters) {
    return ships;
  }

  // Filter ships that match ANY of the filter sets (OR logic between filter sets)
  return ships.filter((ship) => {
    return filterStateArray.every((filterState) => {
      // Check if this filter set matches the ship
      if (!filterState.category) {
        return true; // No category filter, skip this check
      }

      // Check category filter
      if (filterState.category === 'special' && !ship.special) {
        return false;
      }

      // Implement special filtering logic here
      const filterMatcherValue = filterMatcher(
        filterState.effectType,
        Number(filterState.turnCount) || 1,
      );
      return searchForCondition(
        filterState.category === 'ability'
          ? ship.effect.toLowerCase()
          : // mark the special exists because of early return
            ship.special!.toLowerCase(),
        filterMatcherValue.textMatcher,
        filterMatcherValue.regexMatcher,
        {
          matchAnyTurns: filterState.turnCount !== null ? false : true,
        },
      );
    });
  });
};
