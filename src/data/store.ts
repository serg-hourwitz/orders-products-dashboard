import { orders as initialOrders } from './orders';
import { products as initialProducts } from './products';

import type { Order } from '@/types/order';
import type { Product } from '@/types/product';

let ordersStore: Order[] = [...initialOrders];
let productsStore: Product[] = [...initialProducts];

export const getOrdersStore = () => ordersStore;

export const getProductsStore = () => productsStore;

export const deleteOrderFromStore = (orderId: number) => {
  const orderExists = ordersStore.some((order) => order.id === orderId);

  if (!orderExists) {
    return false;
  }

  ordersStore = ordersStore.filter((order) => order.id !== orderId);

  productsStore = productsStore.filter((product) => product.order !== orderId);

  return true;
};
