import { NextResponse } from 'next/server';

import { orders } from '@/data/orders';

export const GET = () => {
  return NextResponse.json(orders);
};
