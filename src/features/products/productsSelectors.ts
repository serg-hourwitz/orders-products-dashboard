import type { RootState } from '@/store';

export const selectProducts = (state: RootState) => state.products.items;

export const selectSelectedProductType = (state: RootState) =>
  state.products.selectedType;

export const selectProductTypes = (state: RootState) => [
  ...new Set(state.products.items.map((product) => product.type)),
];

export const selectFilteredProducts = (state: RootState) => {
  const { items, selectedType } = state.products;

  if (selectedType === 'all') {
    return items;
  }

  return items.filter((product) => product.type === selectedType);
};
