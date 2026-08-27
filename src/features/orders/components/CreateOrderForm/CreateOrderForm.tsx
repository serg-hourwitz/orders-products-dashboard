'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { selectOrderCreating } from '../../ordersSelectors';
import { addOrder } from '../../ordersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import './CreateOrderForm.scss';

const createOrderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Title must contain at least 2 characters')
    .max(80, 'Title must contain no more than 80 characters'),

  description: z
    .string()
    .trim()
    .min(2, 'Description must contain at least 2 characters')
    .max(300, 'Description must contain no more than 300 characters'),

  date: z.string().min(1, 'Date is required'),
});

type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

interface CreateOrderFormProps {
  onSuccess?: () => void;
}

export const CreateOrderForm = ({ onSuccess }: CreateOrderFormProps) => {
  const dispatch = useAppDispatch();

  const creating = useAppSelector(selectOrderCreating);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
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
          Title
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
          Description
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
          Date
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
          {creating ? 'Creating...' : 'Create order'}
        </button>
      </div>
    </form>
  );
};
