import type { JWTPayload } from 'jose';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface JwtPayload extends JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: 'admin';
}
