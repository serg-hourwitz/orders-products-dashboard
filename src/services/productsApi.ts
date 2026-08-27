import type { Product } from '@/types/product';

import { api } from './api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');

  return response.data;
};
