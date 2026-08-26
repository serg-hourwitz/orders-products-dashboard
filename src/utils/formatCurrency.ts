import type { CurrencySymbol } from '@/types/product';

export const formatCurrency = (
  value: number,
  currency: CurrencySymbol,
): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
