'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectOrderCreating } from '../../ordersSelectors';
import { addOrder } from '../../ordersSlice';

import './CreateOrderForm.scss';

const createOrderSchema = (t: TFunction) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(2, t('orders.validation.titleMin'))
      .max(80, t('orders.validation.titleMax')),

    description: z
      .string()
      .trim()
      .min(2, t('orders.validation.descriptionMin'))
      .max(300, t('orders.validation.descriptionMax')),

    date: z
      .string()
      .min(1, t('orders.validation.dateRequired')),
  });

type CreateOrderFormValues = z.infer<
  ReturnType<typeof createOrderSchema>
>;

interface CreateOrderFormProps {
  onSuccess?: () => void;
}

export const CreateOrderForm = ({ onSuccess }: CreateOrderFormProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const creating = useAppSelector(selectOrderCreating);

  const schema = createOrderSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',

    defaultValues: {
      title: '',
      description: '',
      date: '',
    },
  });

  const onSubmit = async (values: CreateOrderFormValues) => {
    try {
      const formattedDate = values.date.replace('T', ' ');

      await dispatch(
        addOrder({
          title: values.title,
          description: values.description,
          date: `${formattedDate}:00`,
        }),
      ).unwrap();

      reset();

      onSuccess?.();
    } catch {
      // Redux already stores request error.
    }
  };

  return (
    <form
      className="create-order-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="create-order-form__field">
        <label htmlFor="order-title" className="create-order-form__label">
          {t('orders.createModal.titleField')}
        </label>

        <input
          id="order-title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          {...register('title')}
        />

        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>

      <div className="create-order-form__field">
        <label htmlFor="order-description" className="create-order-form__label">
          {t('orders.createModal.description')}
        </label>

        <textarea
          id="order-description"
          rows={4}
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          {...register('description')}
        />

        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>

      <div className="create-order-form__field">
        <label htmlFor="order-date" className="create-order-form__label">
          {t('orders.createModal.date')}
        </label>

        <input
          id="order-date"
          type="datetime-local"
          className={`form-control ${errors.date ? 'is-invalid' : ''}`}
          {...register('date')}
        />

        {errors.date && (
          <div className="invalid-feedback">{errors.date.message}</div>
        )}
      </div>

      <div className="create-order-form__actions">
        <button type="submit" className="btn btn-success" disabled={creating}>
          {creating
            ? t('orders.createModal.creating')
            : t('orders.createModal.create')}
        </button>
      </div>
    </form>
  );
};
