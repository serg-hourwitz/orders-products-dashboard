import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

export const selectProducts = (state: RootState) => state.products.items;

export const selectSelectedProductType = (state: RootState) =>
  state.products.selectedType;

export const selectProductTypes = createSelector(
  [selectProducts],
  (products) => [...new Set(products.map((product) => product.type))],
);

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSelectedProductType],
  (products, selectedType) => {
    if (selectedType === 'all') {
      return products;
    }

    return products.filter((product) => product.type === selectedType);
  },
);

export const selectOrderTitleById = (orderId: number) => (state: RootState) =>
  state.orders.items.find((order) => order.id === orderId)?.title ??
  'Unknown order';
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;

export const selectProductsError = (state: RootState) => state.products.error;
