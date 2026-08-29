import { createToken } from '@/lib/auth/jwt';

export const createAuthToken = async () => {
  return createToken({
    userId: '1',
    email: 'admin@example.com',
    name: 'Administrator',
    role: 'admin',
  });
};

export const createAuthenticatedRequest = async (
  url: string,
  init: RequestInit = {},
) => {
  const token = await createAuthToken();

  const headers = new Headers(init.headers);

  headers.set('Cookie', `auth_token=${token}`);

  return new Request(url, {
    ...init,
    headers,
  });
};
