'use client';

import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatLongDate, formatShortDate } from '@/utils/formatDate';

import {
  selectOrderProducts,
  selectOrderTotalByCurrency,
} from '../../ordersSelectors';
import { clearSelectedOrder } from '../../ordersSlice';

import { useTranslation } from 'react-i18next';

import { IconButton } from '@/components/ui/IconButton/IconButton';

import './OrderDetails.scss';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectOrderProducts(order.id));

  const totalUsd = useAppSelector(selectOrderTotalByCurrency(order.id, 'USD'));

  const totalUah = useAppSelector(selectOrderTotalByCurrency(order.id, 'UAH'));

  const handleClose = () => {
    dispatch(clearSelectedOrder());
  };

  const { t } = useTranslation();

  return (
    <motion.aside
      className="order-details"
      initial={{
        opacity: 0,
        x: 60,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 60,
        scale: 0.98,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className="order-details__header">
        <div>
          <h2 className="order-details__title">{order.title}</h2>

          <p className="order-details__description">{order.description}</p>
        </div>

        <IconButton
          className="order-details__close"
          aria-label="Close order details"
          onClick={handleClose}
        >
          ×
        </IconButton>
      </header>

      <div className="order-details__summary">
        <div className="order-details__summary-item">
          <span className="order-details__label">
            {t('orders.details.date')}
          </span>

          <div className="order-details__date">
            <strong>{formatShortDate(order.date)}</strong>
            <span>{formatLongDate(order.date)}</span>
          </div>
        </div>

        <div className="order-details__summary-item">
          <span className="order-details__label">
            {t('orders.details.products')}
          </span>
          <strong>{products.length}</strong>
        </div>

        <div className="order-details__summary-item">
          <span className="order-details__label">
            {t('orders.details.total')}
          </span>

          <div className="order-details__total">
            <span>{formatCurrency(totalUsd, 'USD')}</span>
            <strong>{formatCurrency(totalUah, 'UAH')}</strong>
          </div>
        </div>
      </div>

      <div className="order-details__products">
        <h3 className="order-details__products-title">
          {' '}
          {t('orders.details.products')}
        </h3>

        {products.length > 0 ? (
          <ul className="order-details__products-list">
            {products.map((product) => (
              <li key={product.id} className="order-details__product">
                <div className="order-details__product-info">
                  <strong>{product.title}</strong>
                  <span>{product.type}</span>
                </div>

                <div className="order-details__product-price">
                  {product.price.map((price) => (
                    <span key={price.symbol}>
                      {formatCurrency(price.value, price.symbol)}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="order-details__empty">
            {t('orders.details.noProducts')}
          </p>
        )}
      </div>
    </motion.aside>
  );
};
