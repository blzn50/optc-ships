import { atom } from "nanostores";
import type { ShipOverview } from "./types/Ship";
import type { FilterHierarchy, FilterState } from "./types/Filter";

export const isFilterOpen = atom(false);

export const selectedFilterCount = atom(0);

export const toggleIsFilterOpen = () => isFilterOpen.set(!isFilterOpen.get());

// Atoms for our filter state
export const $filterState = atom<FilterState>({
  category: null,
  subcategory: null,
  effectType: null,
  turnCount: null,
});

// Function to update filter state
export const updateFilter = (filterState: Partial<FilterState>) => {
  $filterState.set({ ...$filterState.get(), ...filterState });
};

// Function to reset filter
export const resetFilter = () => {
  $filterState.set({
    category: null,
    subcategory: null,
    effectType: null,
    turnCount: null,
  });
};

// Define our filter hierarchy with better structure
export const FILTER_HIERARCHY: FilterHierarchy = {
  ability: {
    "beneficial-status-effect": ["reduce special charge"],
    "reduce-enemy-effect": ["def-up", "percent-damage", "threshold-damage"],
    "reduce-status-effect": [
      "bind",
      "despair",
      "special bind",
      "silence",
      "atk down",
      "rcv down",
      "paralysis",
      "decrease chain multiplier growth rate",
      "special reverse",
      "limit special uses",
    ],
    "boost-damage": ["atk", "color-affinity", "slot"],
    "apply-enemy-effect": [],
  },
  special: {
    // Will be populated based on ship data
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

  console.log({ searchMatch, textToSearch, regExpression });

  if (!searchMatch) return false;

  // Handle cases where first capture group might be undefined (for reduce special charge)
  const searchCondition = searchMatch[1] ? searchMatch[1].trim() : "";
  const searchTurns = matchAnyTurns
    ? null
    : searchMatch[2]
      ? parseInt(searchMatch[2], 10)
      : null;

  // Find all matches in the target text
  const regex = new RegExp(regExpression.source, "gi");
  regex.lastIndex = 0;
  let match;

  while ((match = regex.exec(textToSearch)) !== null) {
    // console.log("regex.exec(textToSearch)", regex.exec(textToSearch));
    console.log({ match });
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
      ? conditionsPart.split("/").map((part) => part.trim())
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
  filterState: FilterState,
): ShipOverview[] => {
  if (!filterState.category) {
    return ships; // No filter applied, return all ships
  }

  return ships.filter((ship) => {
    if (filterState.category === "ability") {
      // Check if the ship has an effect that matches our filter
      if (filterState.subcategory === "beneficial-status-effect") {
        return searchForCondition(
          ship.effect,
          `reduces special charge time by ${filterState.turnCount || 1} turn`,
          /reduces\s+(?:([\w\s'’]*(?:and\s+[\w\s'’]+)?\s+)?)?special\s+charge\s+time\s+by\s+(\d+)\s+turns?/i,
          {
            matchAnyTurns: filterState.turnCount !== null ? false : true,
          },
        );
      }

      if (filterState.subcategory === "reduce-enemy-effect") {
        return searchForCondition(
          ship.effect,
          "reduces enemy",
          /reduces enemy's ([\w\s\/]+) duration by (\d+) turns?/i,
          { matchAnyTurns: true },
        );
      }

      if (filterState.subcategory === "reduce-status-effect") {
        if (filterState.effectType) {
          const hasEffectType = searchForCondition(
            ship.effect.toLowerCase(),
            `reduces crew's ${filterState.effectType} duration by ${filterState.turnCount || 1} turn`,
            /reduces crew's ([\w\s\/]+) duration by (\d+) turns?/i,
            { matchAnyTurns: filterState.turnCount !== null ? false : true },
          );

          console.log({ hasEffectType });

          if (!hasEffectType) return false;

          // If no turn count specified, return all matching effects
          return true;
        }
        // If no specific effect type selected, return all reduce status effect ships
        // return searchForCondition(ship.effect, "reduce status effect");
      }
    }

    if (filterState.category === "special" && ship.special) {
      // Implement special filtering logic here
      if (filterState.subcategory) {
        // return searchForCondition(ship.special, filterState.subcategory);
      }
      return true;
    }

    return false;
  });
};
