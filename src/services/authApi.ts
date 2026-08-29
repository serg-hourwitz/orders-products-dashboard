import { api } from './api';

import type { AuthUser } from '@/types/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: AuthUser;
}

export const login = async (
  payload: LoginPayload,
): Promise<AuthUser> => {
  const response =
    await api.post<AuthResponse>(
      '/auth/login',
      payload,
    );

  return response.data.user;
};

export const getSession =
  async (): Promise<AuthUser> => {
    const response =
      await api.get<AuthResponse>(
        '/auth/session',
      );

    return response.data.user;
  };

export const logout = async () => {
  await api.post('/auth/logout');
};
