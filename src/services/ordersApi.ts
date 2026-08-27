import type { Order } from '@/types/order';

import { api } from './api';

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders');

  return response.data;
};
