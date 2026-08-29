import { NextResponse } from 'next/server';

import { verifyToken } from './jwt';

import { AUTH_COOKIE_NAME } from './session';

const getCookieValue = (cookieHeader: string | null, name: string) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const [cookieName, ...valueParts] = cookie.trim().split('=');

    if (cookieName === name) {
      return valueParts.join('=');
    }
  }

  return null;
};

export const requireAuth = async (request: Request) => {
  const token = getCookieValue(request.headers.get('cookie'), AUTH_COOKIE_NAME);

  const session = token ? await verifyToken(token) : null;

  if (!session) {
    return {
      session: null,
      response: NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      ),
    };
  }

  return {
    session,
    response: null,
  };
};
