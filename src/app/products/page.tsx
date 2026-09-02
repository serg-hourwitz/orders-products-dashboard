'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductTypeFilter } from '@/features/products/components/ProductTypeFilter/ProductTypeFilter';
import { ProductsList } from '@/features/products/components/ProductsList/ProductsList';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '@/features/products/productsSelectors';
import { fetchProducts } from '@/features/products/productsSlice';
import { fetchOrders } from '@/features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import './ProductsPage.scss';

const ProductsByTypeChart = dynamic(
  () =>
    import('@/features/dashboard/components/ProductsByTypeChart/ProductsByTypeChart').then(
      (module) => module.ProductsByTypeChart,
    ),
  {
    ssr: false,
    loading: () => <div className="chart-loading">Loading chart...</div>,
  },
);

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (products.length === 0) {
      void dispatch(fetchProducts());
    }

    void dispatch(fetchOrders());
  }, [dispatch, products.length]);

  if (loading && products.length === 0) {
    return (
      <section className="products-page">
        <p>{t('orders.loading')}</p>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="products-page">
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">{t('products.title')}</h1>

        <ProductTypeFilter />
      </div>

      <ProductsList />

      <ProductsByTypeChart />
    </section>
  );
};

export default ProductsPage;
