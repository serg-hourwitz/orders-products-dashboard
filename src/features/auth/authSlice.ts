import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getSession,
  login as loginRequest,
  logout as logoutRequest,
} from '@/services/authApi';

import type { AuthUser } from '@/types/auth';
import type {
  LoginPayload,
} from '@/services/authApi';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload) =>
    loginRequest(payload),
);

export const loadSession =
  createAsyncThunk(
    'auth/loadSession',
    async () => getSession(),
  );

export const logout =
  createAsyncThunk(
    'auth/logout',
    async () => {
      await logoutRequest();
    },
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = 'invalidCredentials';
      })

      .addCase(loadSession.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadSession.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload;
      })

      .addCase(loadSession.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.initialized = true;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
