import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

const selectProducts = (state: RootState) => state.products.items;

const selectOrders = (state: RootState) => state.orders.items;

export const selectProductsByTypeChartData = createSelector(
  [selectProducts],
  (products) => {
    const counts = products.reduce<Record<string, number>>(
      (accumulator, product) => {
        accumulator[product.type] = (accumulator[product.type] ?? 0) + 1;

        return accumulator;
      },
      {},
    );

    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
    }));
  },
);

export const selectOrdersValueChartData = createSelector(
  [selectOrders, selectProducts],
  (orders, products) =>
    orders.map((order) => {
      const orderProducts = products.filter(
        (product) => product.order === order.id,
      );

      const usd = orderProducts.reduce((total, product) => {
        const price = product.price.find((item) => item.symbol === 'USD');

        return total + (price?.value ?? 0);
      }, 0);

      const uah = orderProducts.reduce((total, product) => {
        const price = product.price.find((item) => item.symbol === 'UAH');

        return total + (price?.value ?? 0);
      }, 0);

      return {
        order: order.title,
        usd,
        uah,
      };
    }),
);
