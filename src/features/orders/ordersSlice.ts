import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { orders } from '@/data/orders';
import type { Order } from '@/types/order';

interface OrdersState {
  items: Order[];
  selectedOrderId: number | null;
  orderIdPendingDelete: number | null;
}

const initialState: OrdersState = {
  items: orders,
  selectedOrderId: null,
  orderIdPendingDelete: null,
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

      state.orderIdPendingDelete = null;
    },

    openDeleteOrderModal: (state, action: PayloadAction<number>) => {
      state.orderIdPendingDelete = action.payload;
    },

    closeDeleteOrderModal: (state) => {
      state.orderIdPendingDelete = null;
    },
  },
});

export const {
  selectOrder,
  clearSelectedOrder,
  openDeleteOrderModal,
  closeDeleteOrderModal,
  deleteOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
