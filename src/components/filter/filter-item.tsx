import { ChevronDown, ChevronRight } from 'lucide-react';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
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
  onSelect?: (item: FilterEffectTypeUI | FilterSubcategoryUI) => void;
}> = ({ item, depth = 0, onToggle, onSelect }) => {
  // const [turnValue, setTurnValue] = useState('');
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
