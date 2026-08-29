import { NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth/requireAuth';
import { ordersRepository } from '@/repositories/ordersRepository';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const DELETE = async (
  request: Request,
  { params }: RouteParams,
) => {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  const { id } = await params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return NextResponse.json(
      {
        message: 'Invalid order id',
      },
      {
        status: 400,
      },
    );
  }

  const deleted = await ordersRepository.deleteById(orderId);

  if (!deleted) {
    return NextResponse.json(
      {
        message: 'Order not found',
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    id: orderId,
    message: 'Order deleted successfully',
  });
};
