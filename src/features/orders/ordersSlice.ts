import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { orders } from '@/data/orders';
import type { Order } from '@/types/order';

interface OrdersState {
  items: Order[];
  selectedOrderId: number | null;
}

const initialState: OrdersState = {
  items: orders,
  selectedOrderId: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<number>) => {
      state.selectedOrderId = action.payload;
    },

    clearSelectedOrder: (state) => {
      state.selectedOrderId = null;
    },

    deleteOrder: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((order) => order.id !== action.payload);

      if (state.selectedOrderId === action.payload) {
        state.selectedOrderId = null;
      }
    },
  },
});

export const { selectOrder, clearSelectedOrder, deleteOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
