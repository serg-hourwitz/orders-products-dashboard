import { NextResponse } from 'next/server';

import { getProductsStore } from '@/data/store';

export const GET = () => {
  return NextResponse.json(getProductsStore());
};
