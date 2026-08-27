'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  selectOrderDeleting,
  selectOrderIdPendingDelete,
  selectOrderPendingDelete,
} from '../../ordersSelectors';

import { closeDeleteOrderModal, deleteOrder } from '../../ordersSlice';

import { fetchProducts } from '@/features/products/productsSlice';

import './DeleteOrderModal.scss';

export const DeleteOrderModal = () => {
  const dispatch = useAppDispatch();

  const orderId = useAppSelector(selectOrderIdPendingDelete);
  const order = useAppSelector(selectOrderPendingDelete);

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
                Delete order
              </h2>

              <button
                type="button"
                className="delete-order-modal__close"
                aria-label="Close delete confirmation"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <div className="delete-order-modal__body">
              <p className="delete-order-modal__message">
                Are you sure you want to delete <strong>{order.title}</strong>?
              </p>

              <p className="delete-order-modal__warning">
                All products linked to this order will also be removed.
              </p>
            </div>

            <div className="delete-order-modal__footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                disabled={deleting}
                onClick={handleConfirm}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
