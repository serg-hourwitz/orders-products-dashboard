import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createToken } from '@/lib/auth/jwt';
import { AUTH_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(
  request: Request,
) {
  const body = await request.json();

  const email =
    typeof body.email === 'string'
      ? body.email.trim()
      : '';

  const password =
    typeof body.password === 'string'
      ? body.password
      : '';

  if (!email || !password) {
    return NextResponse.json(
      {
        message:
          'Email and password are required',
      },
      {
        status: 400,
      },
    );
  }

  const expectedEmail =
    process.env.DEMO_USER_EMAIL;

  const expectedPassword =
    process.env.DEMO_USER_PASSWORD;

  if (
    email !== expectedEmail ||
    password !== expectedPassword
  ) {
    return NextResponse.json(
      {
        message: 'Invalid email or password',
      },
      {
        status: 401,
      },
    );
  }

  const user = {
    id: '1',
    email,
    name: 'Administrator',
    role: 'admin' as const,
  };

  const token = await createToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set(
    AUTH_COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    },
  );

  return NextResponse.json({
    user,
  });
}
