import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '@/store';

import { getProducts } from '@/services/productsApi';
import type { Product } from '@/types/product';

interface ProductsState {
  items: Product[];
  selectedType: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedType: 'all',
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch {
      return rejectWithValue('Failed to load products');
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState().products;

      return !loading;
    },
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },

    deleteProductsByOrderId: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (product) => product.order !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load products';
      });
  },
});

export const { setSelectedType, deleteProductsByOrderId } =
  productsSlice.actions;

export default productsSlice.reducer;
