import { NextResponse } from 'next/server';

import { deleteOrderFromStore } from '@/data/store';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const DELETE = async (
  _request: Request,
  { params }: RouteParams,
) => {
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

  const deleted = deleteOrderFromStore(orderId);

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
