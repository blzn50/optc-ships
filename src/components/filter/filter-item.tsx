import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type {
  FilterEffectTypeUI,
  FilterItem,
  FilterSubcategoryUI,
} from './types';

// Recursive component for rendering filter items
export const FilterItemComponent: React.FC<{
  item: FilterItem;
  depth?: number;
  onToggle?: (id: string) => void;
  onSelect?: (
    item: FilterEffectTypeUI | FilterSubcategoryUI,
    turnCount?: string,
  ) => void;
  onTurnUpdate?: (filterId: string, turn?: string) => void;
}> = ({ item, depth = 0, onToggle, onSelect, onTurnUpdate }) => {
  const [turnCountValue, setTurnCountValue] = useState('');
  const shouldShowInput =
    item.type === 'effectType' &&
    item.isSelected &&
    (item.subCategory === 'reduce-status-effect' ||
      item.subCategory === 'reduce-enemy-effect' ||
      item.value === 'reduce special charge');

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
        onSelect(item, turnCountValue);
      } else if (item.type === 'subcategory') {
        onSelect(item);
      }
    }
  };

  const marginLeft = depth * 8;

  const additionalFilterHelper = (
    <Field
      orientation="horizontal"
      className="rounded-b-sm p-2 bg-gray-300 dark:bg-gray-600"
    >
      <FieldLabel htmlFor={`${item.id}-turn`}>Turns:</FieldLabel>
      <Input
        id={`${item.id}-turn`}
        className="w-full h-7"
        type="text"
        placeholder="ex: '2', '1'"
        value={turnCountValue}
        onChange={(e) => {
          setTurnCountValue(e.target.value);
          onTurnUpdate?.(item.id, e.target.value);
        }}
      />
    </Field>
  );

  return (
    <div className="select-none">
      <div
        className={`text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm transition-colors ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ marginLeft: `${marginLeft}px` }}
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
          <div className="w-full">
            <FieldGroup
              className={`rounded-t-sm hover:bg-gray-400 dark:hover:bg-gray-500 ${item.isSelected ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              <Field orientation="horizontal" className="">
                <Checkbox
                  id={item.id}
                  checked={item.isSelected}
                  onCheckedChange={handleSelect}
                  className="ml-3"
                />
                <FieldLabel
                  htmlFor={item.id}
                  className="font-normal cursor-pointer py-2 pr-3"
                >
                  {item.label}
                </FieldLabel>
              </Field>
            </FieldGroup>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${shouldShowInput ? 'max-h-[44px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {additionalFilterHelper}
            </div>
          </div>
        )}

        {/* Count badge for categories and subcategories */}
        {hasChildren && (
          <div className="w-full py-2 pr-3 flex">
            <span
              className={`flex-grow truncate ${isCategory ? 'font-semibold' : 'font-normal'}`}
            >
              {item.label}
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
              {item.children?.length}
            </span>
          </div>
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
              onTurnUpdate={onTurnUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
