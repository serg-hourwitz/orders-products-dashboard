import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { products } from '@/data/products';
import type { Product } from '@/types/product';

interface ProductsState {
  items: Product[];
  selectedType: string;
}

const initialState: ProductsState = {
  items: products,
  selectedType: 'all',
};

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
});

export const { setSelectedType, deleteProductsByOrderId } =
  productsSlice.actions;

export default productsSlice.reducer;
