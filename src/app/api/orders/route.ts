import { NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth/requireAuth';
import { ordersRepository } from '@/repositories/ordersRepository';

interface CreateOrderBody {
  title: string;
  description: string;
  date: string;
}

export const GET = async (request: Request) => {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  const orders = await ordersRepository.findAll();

  return NextResponse.json(orders);
};

export const POST = async (request: Request) => {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  const body = (await request.json()) as Partial<CreateOrderBody>;

  if (typeof body.title !== 'string' || body.title.trim().length < 2) {
    return NextResponse.json(
      {
        message: 'Title must contain at least 2 characters',
      },
      {
        status: 400,
      },
    );
  }

  if (
    typeof body.description !== 'string' ||
    body.description.trim().length < 2
  ) {
    return NextResponse.json(
      {
        message: 'Description must contain at least 2 characters',
      },
      {
        status: 400,
      },
    );
  }

  if (
    typeof body.date !== 'string' ||
    Number.isNaN(Date.parse(body.date.replace(' ', 'T')))
  ) {
    return NextResponse.json(
      {
        message: 'Invalid order date',
      },
      {
        status: 400,
      },
    );
  }

  const order = await ordersRepository.create({
    title: body.title.trim(),
    description: body.description.trim(),
    date: body.date,
  });

  return NextResponse.json(order, {
    status: 201,
  });
};
