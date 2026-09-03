'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { CreateOrderForm } from '../CreateOrderForm/CreateOrderForm';

import { useTranslation } from 'react-i18next';

import { IconButton } from '@/components/ui/IconButton/IconButton';

import './CreateOrderModal.scss';

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateOrderModal = ({ open, onClose }: CreateOrderModalProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="create-order-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="create-order-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-order-title"
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
            <div className="create-order-modal__header">
              <h2 id="create-order-title" className="create-order-modal__title">
                {t('orders.createModal.title')}
              </h2>

              <IconButton
                className="create-order-modal__close"
                aria-label="Close create order form"
                onClick={onClose}
              >
                ×
              </IconButton>
            </div>

            <div className="create-order-modal__body">
              <CreateOrderForm onSuccess={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
