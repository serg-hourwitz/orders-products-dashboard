import { NextResponse } from 'next/server';

import { createOrderInStore, getOrdersStore } from '@/data/store';

import { requireAuth } from '@/lib/auth/requireAuth';

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
  return NextResponse.json(getOrdersStore());
};

export const POST = async (request: Request) => {
  const body = (await request.json()) as Partial<CreateOrderBody>;

  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

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

  const order = createOrderInStore({
    title: body.title.trim(),
    description: body.description.trim(),
    date: body.date,
  });

  return NextResponse.json(order, {
    status: 201,
  });
};
