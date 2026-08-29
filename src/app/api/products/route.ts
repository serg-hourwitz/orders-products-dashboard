import { NextResponse } from 'next/server';

import { getProductsStore } from '@/data/store';

import { requireAuth } from '@/lib/auth/requireAuth';

export async function GET(request: Request) {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }
  return NextResponse.json(getProductsStore());
};
