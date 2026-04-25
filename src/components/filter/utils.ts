import { FILTER_HIERARCHY } from '@/stores/filterStore';

import type { AbilityFilter, BeneficialEffect } from '@/types/Filter';
import { compareLabel } from '@/lib/array-utils';

import type { FilterCategoryUI, FilterEffectTypeUI } from './types';

export const formattedEffectLabel: Record<string, string> = {
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
export const formatLabel = (str: string): string => {
  const formattedStr = formattedEffectLabel[str] || str;
  return formattedStr
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Build filter structure with proper typing
export const buildFilterStructure = (): FilterCategoryUI[] => {
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
