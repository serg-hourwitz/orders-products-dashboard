import type { Order } from '@/types/order';

import { api } from './api';

interface DeleteOrderResponse {
  id: number;
  message: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders');

  return response.data;
};

export const removeOrder = async (
  orderId: number,
): Promise<DeleteOrderResponse> => {
  const response = await api.delete<DeleteOrderResponse>(`/orders/${orderId}`);

  return response.data;
};
