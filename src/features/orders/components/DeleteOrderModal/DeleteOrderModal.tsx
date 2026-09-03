'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import Image from 'next/image';

import { formatCurrency } from '@/utils/formatCurrency';
import { formatLongDate, formatShortDate } from '@/utils/formatDate';

import {
  selectOrderDeleting,
  selectOrderIdPendingDelete,
  selectOrderPendingDelete,
  selectOrderProducts,
} from '../../ordersSelectors';

import { closeDeleteOrderModal, deleteOrder } from '../../ordersSlice';

import { fetchProducts } from '@/features/products/productsSlice';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button/Button';
import { IconButton } from '@/components/ui/IconButton/IconButton';

import './DeleteOrderModal.scss';

export const DeleteOrderModal = () => {
  const dispatch = useAppDispatch();

  const orderId = useAppSelector(selectOrderIdPendingDelete);
  const order = useAppSelector(selectOrderPendingDelete);
  const products = useAppSelector(selectOrderProducts(orderId ?? -1));

  const handleClose = () => {
    dispatch(closeDeleteOrderModal());
  };

  const deleting = useAppSelector(selectOrderDeleting);

  const handleConfirm = async () => {
    if (orderId === null) {
      return;
    }

    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      await dispatch(fetchProducts()).unwrap();
    } catch {
      // Error already stored in Redux.
    }
  };

  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          className="delete-order-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="delete-order-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-order-title"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="delete-order-modal__header">
              <h2 id="delete-order-title" className="delete-order-modal__title">
                {t('orders.deleteModal.title')}
              </h2>

              <IconButton
                className="delete-order-modal__close"
                aria-label="Close delete confirmation"
                onClick={handleClose}
              >
                ×
              </IconButton>
            </div>

            <div className="delete-order-modal__body">
              <p className="delete-order-modal__message">
                {t('orders.deleteModal.message')} <strong>{order.title}</strong>
                ?
              </p>

              <p className="delete-order-modal__warning">
                {t('orders.deleteModal.warning')}
              </p>

              {products.length > 0 && (
                <div className="delete-order-modal__products">
                  <div className="delete-order-modal__products-header">
                    <h3 className="delete-order-modal__products-title">
                      {t('orders.details.products')}
                    </h3>

                    <span className="delete-order-modal__products-count">
                      {products.length}
                    </span>
                  </div>

                  <div className="delete-order-modal__products-list">
                    {products.map((product) => (
                      <article
                        key={product.id}
                        className="delete-order-modal__product"
                      >
                        <div className="delete-order-modal__product-main">
                          <span
                            className={`delete-order-modal__status-dot ${
                              product.isNew
                                ? 'delete-order-modal__status-dot--new'
                                : 'delete-order-modal__status-dot--used'
                            }`}
                          />

                          <div className="delete-order-modal__image-wrapper">
                            <Image
                              src={product.photo}
                              alt={product.title}
                              width={44}
                              height={44}
                              className="delete-order-modal__image"
                            />
                          </div>

                          <div className="delete-order-modal__product-name">
                            <strong>{product.title}</strong>
                            <span>SN: {product.serialNumber}</span>
                          </div>
                        </div>

                        <div className="delete-order-modal__product-info">
                          <div>
                            <span className="delete-order-modal__label">
                              {t('products.type')}
                            </span>
                            <strong>{product.type}</strong>
                          </div>

                          <div>
                            <span className="delete-order-modal__label">
                              {t('products.guarantee')}
                            </span>
                            <span>
                              {formatShortDate(product.guarantee.start)}
                            </span>
                            <span>{formatLongDate(product.guarantee.end)}</span>
                          </div>

                          <div>
                            <span className="delete-order-modal__label">
                              {t('products.price')}
                            </span>

                            {product.price.map((price) => (
                              <span
                                key={price.symbol}
                                className={
                                  price.isDefault
                                    ? 'delete-order-modal__price-default'
                                    : undefined
                                }
                              >
                                {formatCurrency(price.value, price.symbol)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="delete-order-modal__footer">
              <Button variant="outline-secondary" onClick={handleClose}>
                {t('orders.deleteModal.cancel')}
              </Button>

              <Button
                variant="danger"
                isLoading={deleting}
                onClick={handleConfirm}
              >
                {deleting
                  ? t('orders.deleteModal.deleting')
                  : t('orders.deleteModal.delete')}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
