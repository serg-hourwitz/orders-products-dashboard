import type { RootState } from '@/store';

export const selectAuthUser = (
  state: RootState,
) => state.auth.user;

export const selectAuthLoading = (
  state: RootState,
) => state.auth.loading;

export const selectAuthInitialized = (
  state: RootState,
) => state.auth.initialized;

export const selectAuthError = (
  state: RootState,
) => state.auth.error;

export const selectIsAuthenticated = (
  state: RootState,
) => Boolean(state.auth.user);
