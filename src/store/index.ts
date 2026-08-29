import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from '@/features/orders/ordersSlice';
import productsReducer from '@/features/products/productsSlice';

import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
