import type { RootState } from '@/store';

export const selectOrders = (state: RootState) => state.orders.items;

export const selectSelectedOrderId = (state: RootState) =>
  state.orders.selectedOrderId;

export const selectSelectedOrder = (state: RootState) => {
  const selectedOrderId = state.orders.selectedOrderId;

  return (
    state.orders.items.find((order) => order.id === selectedOrderId) ?? null
  );
};

export const selectOrderProducts = (orderId: number) => (state: RootState) =>
  state.products.items.filter((product) => product.order === orderId);

export const selectOrderProductsCount =
  (orderId: number) => (state: RootState) =>
    state.products.items.filter((product) => product.order === orderId).length;

export const selectOrderTotalByCurrency =
  (orderId: number, currency: 'USD' | 'UAH') => (state: RootState) =>
    state.products.items
      .filter((product) => product.order === orderId)
      .reduce((total, product) => {
        const price = product.price.find((item) => item.symbol === currency);

        return total + (price?.value ?? 0);
      }, 0);

export const selectOrderIdPendingDelete = (state: RootState) =>
  state.orders.orderIdPendingDelete;

export const selectOrderPendingDelete = (state: RootState) => {
  const orderId = state.orders.orderIdPendingDelete;

  return state.orders.items.find((order) => order.id === orderId) ?? null;
};
