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

export const selectOrderTitleById = (orderId: number) => (state: RootState) =>
  state.orders.items.find((order) => order.id === orderId)?.title ??
  'Unknown order';
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;

export const selectProductsError = (state: RootState) => state.products.error;
