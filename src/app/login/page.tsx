'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { login } from '@/features/auth/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
} from '@/features/auth/authSelectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      router.replace('/orders');
    }
  };

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-form__title">{t('auth.signIn')}</h1>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="email">
            {t('auth.email')}
          </label>

          <input
            id="email"
            type="email"
            className="form-control"
            {...register('email', {
              required: t('auth.emailRequired'),
            })}
          />

          {errors.email && (
            <div className="login-form__error">{errors.email.message}</div>
          )}
        </div>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            {t('auth.password')}
          </label>

          <input
            id="password"
            type="password"
            className="form-control"
            {...register('password', {
              required: t('auth.passwordRequired'),
            })}
          />

          {errors.password && (
            <div className="login-form__error">{errors.password.message}</div>
          )}
        </div>

        {error && (
          <div className="login-form__error">
            {t(`auth.${error}`)}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary login-form__submit"
          disabled={loading}
        >
          {loading ? t('auth.signingIn') : t('auth.signIn')}
        </button>
      </form>
    </main>
  );
}
