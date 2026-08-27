import { NextResponse } from 'next/server';

import { products } from '@/data/products';

export const GET = () => {
  return NextResponse.json(products);
};
