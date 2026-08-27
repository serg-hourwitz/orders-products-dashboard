import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { getOrders } from '@/services/ordersApi';
import type { Order } from '@/types/order';

interface OrdersState {
  items: Order[];
  selectedOrderId: number | null;
  orderIdPendingDelete: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  selectedOrderId: null,
  orderIdPendingDelete: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrders();
  } catch {
    return rejectWithValue('Failed to load orders');
  }
});

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

    openDeleteOrderModal: (state, action: PayloadAction<number>) => {
      state.orderIdPendingDelete = action.payload;
    },

    closeDeleteOrderModal: (state) => {
      state.orderIdPendingDelete = null;
    },

    deleteOrder: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((order) => order.id !== action.payload);

      if (state.selectedOrderId === action.payload) {
        state.selectedOrderId = null;
      }

      state.orderIdPendingDelete = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load orders';
      });
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
