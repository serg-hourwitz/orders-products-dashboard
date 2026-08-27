'use client';

import { useEffect } from 'react';

import { ProductTypeFilter } from '@/features/products/components/ProductTypeFilter/ProductTypeFilter';
import { ProductsList } from '@/features/products/components/ProductsList/ProductsList';
import {
  selectProductsError,
  selectProductsLoading,
} from '@/features/products/productsSelectors';
import { fetchProducts } from '@/features/products/productsSlice';
import { fetchOrders } from '@/features/orders/ordersSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';

import './ProductsPage.scss';

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    void dispatch(fetchProducts());
    void dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="products-page">
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-page">
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">Products</h1>

        <ProductTypeFilter />
      </div>

      <ProductsList />
    </section>
  );
};

export default ProductsPage;
