import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'auth_token';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not defined',
    );
  }

  return new TextEncoder().encode(secret);
};

const verifyAuthToken = async (
  token: string,
) => {
  try {
    const { payload } = await jwtVerify(
      token,
      getSecret(),
      {
        algorithms: ['HS256'],
      },
    );

    return payload;
  } catch {
    return null;
  }
};

export default async function proxy(
  request: NextRequest,
) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get(
    AUTH_COOKIE_NAME,
  )?.value;

  const session = token
    ? await verifyAuthToken(token)
    : null;

  const isProtectedRoute =
    pathname === '/orders' ||
    pathname.startsWith('/orders/') ||
    pathname === '/products' ||
    pathname.startsWith('/products/');

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(
      new URL('/login', request.url),
    );
  }

  if (
    pathname === '/login' &&
    session
  ) {
    return NextResponse.redirect(
      new URL('/orders', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/orders/:path*',
    '/products/:path*',
    '/login',
  ],
};
