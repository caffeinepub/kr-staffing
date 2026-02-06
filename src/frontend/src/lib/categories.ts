import type { JobCategory } from '../backend';

export interface CategoryInfo {
  id: string;
  label: string;
  backendCategory: JobCategory;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'delivery',
    label: 'Delivery',
    backendCategory: { __kind__: 'delivery', delivery: null },
    description: 'Delivery executive and courier jobs',
  },
  {
    id: 'sales',
    label: 'Sales Executive',
    backendCategory: { __kind__: 'other', other: 'Sales Executive' },
    description: 'Sales and business development roles',
  },
  {
    id: 'telecaller',
    label: 'Telecaller',
    backendCategory: { __kind__: 'telecaller', telecaller: null },
    description: 'Telecalling and customer support',
  },
  {
    id: 'field-executive',
    label: 'Field Executive',
    backendCategory: { __kind__: 'fieldExec', fieldExec: null },
    description: 'Field operations and on-ground roles',
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    backendCategory: { __kind__: 'warehouse', warehouse: null },
    description: 'Warehouse and logistics operations',
  },
  {
    id: 'back-office',
    label: 'Back Office',
    backendCategory: { __kind__: 'backOffice', backOffice: null },
    description: 'Administrative and back office support',
  },
  {
    id: 'marketing',
    label: 'Marketing / Digital',
    backendCategory: { __kind__: 'other', other: 'Marketing' },
    description: 'Marketing and digital media roles',
  },
];

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoryLabel(category: JobCategory): string {
  if (category.__kind__ === 'other') {
    return category.other;
  }
  const found = categories.find((cat) => cat.backendCategory.__kind__ === category.__kind__);
  return found?.label || 'Other';
}
