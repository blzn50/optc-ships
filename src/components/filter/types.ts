import type {
  AbilityFilter,
  EffectUnion,
  FilterCategory,
} from '@/types/Filter';

// Discriminated union types for our filter structure
export interface BaseFilterItem {
  id: string;
  label: string;
  isOpen?: boolean;
  isSelected?: boolean;
}

export interface FilterCategoryUI extends BaseFilterItem {
  type: 'category';
  id: FilterCategory;
  children: FilterSubcategoryUI[];
}

export interface FilterSubcategoryUI extends BaseFilterItem {
  type: 'subcategory';
  value: AbilityFilter;
  children: FilterEffectTypeUI[];
}

export interface FilterEffectTypeUI extends BaseFilterItem {
  type: 'effectType';
  value: EffectUnion | null;
  category: FilterCategory | null;
  subCategory: AbilityFilter;
}

export type FilterItem =
  | FilterCategoryUI
  | FilterSubcategoryUI
  | FilterEffectTypeUI;
