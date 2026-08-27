import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import {
  createOrder,
  getOrders,
  removeOrder,
  type CreateOrderPayload,
} from '@/services/ordersApi';
import type { Order } from '@/types/order';

interface OrdersState {
  items: Order[];
  selectedOrderId: number | null;
  orderIdPendingDelete: number | null;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  selectedOrderId: null,
  orderIdPendingDelete: null,
  loading: false,
  creating: false,
  deleting: false,
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

export const deleteOrder = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('orders/deleteOrder', async (orderId, { rejectWithValue }) => {
  try {
    await removeOrder(orderId);

    return orderId;
  } catch {
    return rejectWithValue('Failed to delete order');
  }
});

export const addOrder = createAsyncThunk<
  Order,
  CreateOrderPayload,
  { rejectValue: string }
>('orders/addOrder', async (payload, { rejectWithValue }) => {
  try {
    return await createOrder(payload);
  } catch {
    return rejectWithValue('Failed to create order');
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
      })
      .addCase(deleteOrder.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.deleting = false;

        state.items = state.items.filter(
          (order) => order.id !== action.payload,
        );

        if (state.selectedOrderId === action.payload) {
          state.selectedOrderId = null;
        }

        state.orderIdPendingDelete = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload ?? 'Failed to delete order';
      })
      .addCase(addOrder.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? 'Failed to create order';
      });
  },
});

export const {
  selectOrder,
  clearSelectedOrder,
  openDeleteOrderModal,
  closeDeleteOrderModal,
} = ordersSlice.actions;
export default ordersSlice.reducer;
