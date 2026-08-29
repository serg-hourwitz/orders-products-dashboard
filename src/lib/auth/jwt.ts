import { jwtVerify, SignJWT } from 'jose';

import type { JwtPayload } from '@/types/auth';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not defined',
    );
  }

  return new TextEncoder().encode(secret);
};

export const createToken = async (payload: JwtPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
};

export const verifyToken = async (
  token: string,
): Promise<JwtPayload | null> => {
  try {
    const { payload } =
      await jwtVerify<JwtPayload>(
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
