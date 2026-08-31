'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import './not-found.scss';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="not-found">
      <div className="not-found__content">
        <span className="not-found__code">404</span>

        <h1 className="not-found__title">
          {t('notFound.title')}
        </h1>

        <p className="not-found__description">
          {t('notFound.description')}
        </p>

        <Link
          href="/orders"
          className="not-found__link btn btn-success"
        >
          {t('notFound.backToOrders')}
        </Link>
      </div>
    </main>
  );
}
