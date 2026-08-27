'use client';

import { useEffect, useState } from 'react';

import { DeleteOrderModal } from '@/features/orders/components/DeleteOrderModal/DeleteOrderModal';
import { OrdersList } from '@/features/orders/components/OrdersList/OrdersList';
import {
  selectOrdersError,
  selectOrdersLoading,
} from '@/features/orders/ordersSelectors';
import { fetchOrders } from '@/features/orders/ordersSlice';
import { fetchProducts } from '@/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectOrders } from '@/features/orders/ordersSelectors';
import { selectProducts } from '@/features/products/productsSelectors';

import { CreateOrderModal } from '@/features/orders/components/CreateOrderModal/CreateOrderModal';

import './OrdersPage.scss';

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      void dispatch(fetchProducts());
    }

    if (orders.length === 0) {
      void dispatch(fetchOrders());
    }
  }, [dispatch, orders.length, products.length]);

  if (loading) {
    return (
      <section className="orders-page">
        <p>Loading orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="orders-page">
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <h1 className="orders-page__title">Orders</h1>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add order
        </button>
      </div>

      <OrdersList />
      <DeleteOrderModal />
      <CreateOrderModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </section>
  );
};

export default OrdersPage;
