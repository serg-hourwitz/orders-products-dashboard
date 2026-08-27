import { NextResponse } from 'next/server';

import { getOrdersStore } from '@/data/store';

export const GET = () => {
  return NextResponse.json(getOrdersStore());
};
