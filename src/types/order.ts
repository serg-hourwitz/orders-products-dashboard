import type { Product } from './product';

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products?: Product[];
}
