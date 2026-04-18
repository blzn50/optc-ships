import { atom } from "nanostores";
import { filterMatcher } from "@/lib/matcher";
import type { ShipOverview } from "@/types/Ship";
import type { FilterHierarchy, FilterState } from "@/types/Filter";

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
    "beneficial-status-effect": [
      "reduce special charge",
      "atk",
      "hp",
      "land perfect strikes",
      "orb chance booster",
      "change orbs",
      "percent damage reduction",
      "heal eot",
    ],
    "reduce-status-effect": [
      "bind",
      "despair",
      "special bind",
      "atk down",
      "paralysis",
      "decrease chain multiplier growth rate",
      "special reverse",
      "limit special uses",
    ],
  },
  special: {
    "beneficial-status-effect": [
      "reduce special charge",
      "change orbs",
      "lock orbs",
      "reduce switch effect",
      "threshold damage reduction",
      "percent damage reduction",
      "heal",
      "heal eot",
      "hp guard",
    ],
    "fixed-damage": ["instant damage", "end of turn damage", "percent damage"],
    "boost-damage": [
      "base atk",
      "atk",
      "color affinity",
      "slot",
      "final tap atk",
      "orb effect multiplier",
      "ignited damage boost",
      "def down damage boost",
      "additive chain multiplier",
      "percent damage boost",
      "chain multiplier growth",
    ],
    "reduce-status-effect": [
      "bind",
      "despair",
      "atk down",
      "paralysis",
      "slot bind",
      "burn",
      "eot heal to damage",
    ],
    "reduce-enemy-effect": [
      "def up",
      "enemy percent damage reduction",
      "enemy threshold damage reduction",
      "barrier",
      "resilience",
    ],
    "apply-enemy-effect": [
      "enemy def down",
      "delay",
      "negative resistance",
      "enemy paralysis",
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

  console.log({ searchText, searchMatch, textToSearch, regExpression });

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
    //early return
    if (filterState.category === "special" && !ship.special) {
      return false;
    }

    // Implement special filtering logic here
    const filterMatcherValue = filterMatcher(
      filterState.effectType,
      filterState.turnCount || 1,
    );
    return searchForCondition(
      filterState.category === "ability"
        ? ship.effect.toLowerCase()
        : // mark the special exists because of early return
          ship.special!.toLowerCase(),
      filterMatcherValue.textMatcher,
      filterMatcherValue.regexMatcher,
      {
        matchAnyTurns: filterState.turnCount !== null ? false : true,
      },
    );

    // if (filterState.subcategory === "reduce-enemy-effect") {
    //   return searchForCondition(
    //     ship.special,
    //     "reduces enemy",
    //     /reduces enemy's ([\w\s\/]+) duration by (\d+) turns?/i,
    //     { matchAnyTurns: true },
    //   );
    // }

    // if (filterState.subcategory === "boost-damage") {
    //   if (filterState.effectType) {
    //     const hasEffectType = searchForCondition(
    //       ship.special.toLowerCase(),
    //       `reduces crew's ${filterState.effectType} duration by ${filterState.turnCount || 1} turn`,
    //       /reduces crew's ([\w\s\/]+) duration by (\d+) turns?/i,
    //       { matchAnyTurns: filterState.turnCount !== null ? false : true },
    //     );

    //     console.log({ hasEffectType });

    //     if (!hasEffectType) return false;

    //     // If no turn count specified, return all matching effects
    //     return true;
    //   }
    // }

    return false;
  });
};
