import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useStore } from '@nanostores/react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  isFilterOpen,
  selectedFilterCount,
  $filterState,
  updateFilter,
  resetFilter,
  FILTER_HIERARCHY,
} from '@/stores/filterStore';
import { compareLabel } from '@/lib/array-utils';
import {
  type FilterCategory,
  type AbilityFilter,
  type StatusDebuff,
  type EnemyEffect,
  type DamageBoost,
  type BeneficialEffect,
  type EffectUnion,
} from '@/types/Filter';

// Discriminated union types for our filter structure
interface BaseFilterItem {
  id: string;
  label: string;
  isOpen?: boolean;
  isSelected?: boolean;
}

interface FilterCategoryUI extends BaseFilterItem {
  type: 'category';
  id: FilterCategory;
  children: FilterSubcategoryUI[];
}

interface FilterSubcategoryUI extends BaseFilterItem {
  type: 'subcategory';
  value: AbilityFilter;
  children: FilterEffectTypeUI[];
}

interface FilterEffectTypeUI extends BaseFilterItem {
  type: 'effectType';
  value: EffectUnion | null;
  category: FilterCategory | null;
  subCategory: AbilityFilter;
}

type FilterItem = FilterCategoryUI | FilterSubcategoryUI | FilterEffectTypeUI;

const formattedEffectLabel: Record<string, string> = {
  'atk down': 'ATK down',
  'limit special uses': 'special use limit',
  'decrease chain multiplier growth rate': 'chain coefficient reduction',
  atk: 'ATK Boost',
  hp: 'HP boost',
  slot: 'slot boost',
  'heal eot': 'heal EOT',
  'hp guard': 'HP guard',
  'final tap atk': 'final tap ATK',
  'ignited damage boost': 'ignited damage',
  'def down damage boost': 'def down damage',
  'poison damage boost': 'poison damage',
  'percent damage boost': 'percent damage',
  'delayed damage boost': 'delayed damage',
  'enemy percent damage': 'percent damage',
  'enemy threshold damage': 'threshold damage',
  'enemy def down': 'def down',
  'enemy paralysis': 'paralysis',
};

// Helper function to format labels for display
const formatLabel = (str: string): string => {
  const formattedStr = formattedEffectLabel[str] || str;
  return formattedStr
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Build filter structure with proper typing
const buildFilterStructure = (): FilterCategoryUI[] => {
  const abilityEntries = Object.keys(FILTER_HIERARCHY.ability) as Array<
    keyof typeof FILTER_HIERARCHY.ability
  >;
  const specialEntries = Object.keys(FILTER_HIERARCHY.special) as Array<
    keyof typeof FILTER_HIERARCHY.special
  >;

  return [
    {
      id: 'ability',
      label: 'Ship Ability',
      type: 'category',
      isOpen: true,
      children: abilityEntries.map((key) => {
        const effectTypes = FILTER_HIERARCHY.ability[key];
        const subcategoryKey = key as AbilityFilter;
        const formattedLabel = formatLabel(key as string);

        let children: FilterEffectTypeUI[] = [];

        // Add effect types based on subcategory
        if (Array.isArray(effectTypes)) {
          children = (effectTypes as BeneficialEffect[])
            .map((effectType) => ({
              id: `ability-${subcategoryKey}-${effectType}`,
              label: formatLabel(effectType),
              value: effectType,
              type: 'effectType' as const,
              category: 'ability' as const,
              subCategory: subcategoryKey,
              isSelected: false,
            }))
            .sort(compareLabel);
        }

        return {
          id: `ability-${subcategoryKey}`,
          label: formattedLabel,
          value: subcategoryKey,
          type: 'subcategory' as const,
          isOpen: false,
          children,
        };
      }),
    },
    {
      id: 'special',
      label: 'Ship Special',
      type: 'category',
      isOpen: true,
      children: specialEntries.map((key) => {
        const effectTypes = FILTER_HIERARCHY.special[key];
        const subcategoryKey = key as AbilityFilter;
        const formattedLabel = formatLabel(key as string);

        let children: FilterEffectTypeUI[] = [];

        // Add effect types based on subcategory
        if (Array.isArray(effectTypes)) {
          children = (effectTypes as BeneficialEffect[])
            .map((effectType) => ({
              id: `special-${subcategoryKey}-${effectType}`,
              label: formatLabel(effectType),
              value: effectType,
              type: 'effectType' as const,
              category: 'special' as const,
              subCategory: subcategoryKey,
              isSelected: false,
            }))
            .sort(compareLabel);
        }

        return {
          id: `special-${subcategoryKey}`,
          label: formattedLabel,
          value: subcategoryKey,
          type: 'subcategory' as const,
          isOpen: false,
          children,
        };
      }),
    },
  ];
};

// Recursive component for rendering filter items
const FilterItemComponent: React.FC<{
  item: FilterItem;
  depth?: number;
  onToggle?: (id: string) => void;
  onSelect?: (item: FilterEffectTypeUI | FilterSubcategoryUI) => void;
}> = ({ item, depth = 0, onToggle, onSelect }) => {
  const hasChildren =
    'children' in item && item.children && item.children.length > 0;
  const isCategory = depth === 0;
  const isSelectable = depth > 1;

  const handleToggle = () => {
    if (hasChildren && onToggle) {
      onToggle(item.id);
    }
  };

  const handleSelect = () => {
    if (isSelectable && onSelect) {
      if (item.type === 'effectType') {
        onSelect(item);
      } else if (item.type === 'subcategory') {
        onSelect(item);
      }
    }
  };

  const paddingLeft = depth * 8;

  return (
    <div className="select-none">
      <div
        className={`text-sm flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={hasChildren ? handleToggle : undefined}
      >
        {/* Chevron icon for expandable items */}
        {hasChildren && (
          <span className="mr-2 flex-shrink-0">
            {item.isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}

        {/* Checkbox for selectable items */}
        {isSelectable && (
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                id={item.id}
                checked={item.isSelected}
                onCheckedChange={handleSelect}
              />
              <FieldLabel
                htmlFor={item.id}
                className="font-normal cursor-pointer"
              >
                {item.label}
              </FieldLabel>
            </Field>
          </FieldGroup>
        )}

        {/* Count badge for categories and subcategories */}
        {hasChildren && (
          <>
            <span
              className={`flex-grow truncate ${isCategory ? 'font-semibold' : 'font-normal'}`}
            >
              {item.label}
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
              {item.children?.length}
            </span>
          </>
        )}
      </div>

      {/* Render children if open */}
      {hasChildren && item.isOpen && (
        <div>
          {item.children?.map((child) => (
            <FilterItemComponent
              key={child.id}
              item={child}
              depth={depth + 1}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to recursively update categories and their children
const updateFilterStructure = (
  categories: FilterCategoryUI[],
  updateFn: (item: FilterItem) => FilterItem,
): FilterCategoryUI[] => {
  return categories.map((category) => {
    const updatedCategory = updateFn(category);
    if (updatedCategory.type !== 'category') return category;

    const updatedChildren = updatedCategory.children.map((subcategory) => {
      const updatedSubcategory = updateFn(subcategory);
      if (updatedSubcategory.type !== 'subcategory') return subcategory;

      const updatedEffectTypes = updatedSubcategory.children.map(
        (effectType) => {
          return updateFn(effectType);
        },
      );

      return {
        ...updatedSubcategory,
        children: updatedEffectTypes as FilterEffectTypeUI[],
      };
    });

    return {
      ...updatedCategory,
      children: updatedChildren as FilterSubcategoryUI[],
    };
  });
};

// Main Filter Component
export const FilterComponent: React.FC = () => {
  const $isFilterOpen = useStore(isFilterOpen);
  const filterState = useStore($filterState);
  const [filterStructure, setFilterStructure] = useState<FilterCategoryUI[]>(
    buildFilterStructure(),
  );

  // Auto-close filter on larger screens
  useEffect(() => {
    const handleResize = () => {
      // On xl screens and above, keep filter open by default
      if (window.innerWidth >= 1280) {
        // xl breakpoint
        isFilterOpen.set(true);
      } else {
        isFilterOpen.set(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update filter structure when filter state changes
  useEffect(() => {
    const updatedStructure = updateFilterStructure(filterStructure, (item) => {
      let isSelected = false;

      if (item.type === 'effectType') {
        // Check if this effect type is selected
        isSelected =
          item.value === filterState.effectType &&
          item.category === filterState.category;
      } else if (item.type === 'subcategory') {
        // Check if this subcategory is selected
        isSelected =
          item.value === filterState.subcategory &&
          filterState.effectType === null;
      }

      return { ...item, isSelected };
    });

    setFilterStructure(updatedStructure);
  }, [filterState]);

  const handleToggle = (id: string) => {
    const updatedStructure = updateFilterStructure(filterStructure, (item) => {
      if (item.id === id && 'children' in item) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });

    setFilterStructure(updatedStructure);
  };

  const handleSelect = (item: FilterEffectTypeUI | FilterSubcategoryUI) => {
    // Handle effect type selection/deselection
    if (item.type === 'effectType') {
      const isAlreadySelected =
        filterState.category === item.category &&
        filterState.subcategory === item.subCategory &&
        filterState.effectType === item.value;

      if (isAlreadySelected) {
        // Deselect by resetting filter
        updateFilter({
          category: null,
          subcategory: null,
          effectType: null,
          turnCount: null,
        });
      } else {
        // Select the effect type
        updateFilter({
          category: item.category,
          subcategory: item.subCategory,
          effectType: item.value,
          turnCount: null,
        });
      }
    }
  };

  // Count selected items based on filter state
  const selectedCount = filterState.effectType ? 1 : 0;

  selectedFilterCount.set(selectedCount);

  return (
    <div className={`relative w-full h-full`}>
      {/* Backdrop overlay for mobile */}
      {$isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 xl:hidden"
          onClick={() => isFilterOpen.set(false)}
        />
      )}
      <div className="absolute -top-[4.5rem] xl:top-0 -left-2 w-full h-full max-xl:pt-3 xl:pt-1">
        {/* Filter Sidebar */}
        <div
          className={`fixed z-50 
          transition-transform duration-300 ease-in-out
          md:w-1/2 w-full h-full max-w-md
          xl:fixed xl:transform-none xl:max-w-full xl:w-[19rem] 2xl:w-[23rem]
          ${$isFilterOpen ? 'translate-x-0' : '-translate-x-[140%]'}
        `}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-r-lg border-r border-gray-200 dark:border-gray-700 shadow-lg xl:shadow-sm xl:rounded-lg xl:border xl:h-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                </div>

                {/* Close button for mobile */}
                <button
                  onClick={() => isFilterOpen.set(false)}
                  className="xl:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  aria-label="Close filter"
                >
                  <X size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCount} selected
                </span>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => {
                      resetFilter();
                      // Reset all selections in UI
                      const resetStructure = updateFilterStructure(
                        filterStructure,
                        (item) => ({
                          ...item,
                          isSelected: false,
                        }),
                      );
                      setFilterStructure(resetStructure);
                    }}
                    variant={'secondary'}
                    size={'sm'}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter List */}
            <div className="p-2 h-[calc(100dvh-224px)] sm:h-[calc(100dvh-176px)] xl:max-h-[calc(100dvh-244px)] overflow-y-auto">
              {filterStructure.map((category) => (
                <FilterItemComponent
                  key={category.id}
                  item={category}
                  onToggle={handleToggle}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-br-lg xl:static xl:rounded-b-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <button
                  onClick={() => {
                    console.log('Current filter state:', filterState);
                    // Close filter on mobile after applying
                    if (window.innerWidth < 1280) {
                      isFilterOpen.set(false);
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    resetFilter();
                    // Reset all selections and close all categories
                    const resetStructure = updateFilterStructure(
                      filterStructure,
                      (item) => ({
                        ...item,
                        isSelected: false,
                        isOpen: item.type === 'category' ? true : false,
                      }),
                    );
                    setFilterStructure(resetStructure);
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
