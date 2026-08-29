import { NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth/requireAuth';
import { productsRepository } from '@/repositories/productsRepository';

export const GET = async (request: Request) => {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  const products = await productsRepository.findAll();

  return NextResponse.json(products);
};
