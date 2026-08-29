'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher/LanguageSwitcher';

import {
  logout,
} from '@/features/auth/authSlice';

import {
  selectAuthUser,
} from '@/features/auth/authSelectors';

import { useActiveSessions } from '@/hooks/useActiveSessions';

import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';

import './TopMenu.scss';

const getCurrentDate = () => new Date();

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  const { t } = useTranslation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    selectAuthUser,
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const formattedDate = currentDate
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(currentDate)
    : '--';

  const formattedTime = currentDate
    ? new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(currentDate)
    : '--:--:--';

  const {
    count: activeSessions,
    connected: socketConnected,
  } = useActiveSessions();

  const handleLogout = async () => {
    const result = await dispatch(
      logout(),
    );

    if (logout.fulfilled.match(result)) {
      router.replace('/login');
      router.refresh();
    }
  };

  return (
    <header className="top-menu">
      <div className="top-menu__brand">
        <span className="top-menu__brand-title">
          {t('topMenu.title')}
        </span>
      </div>

      <div className="top-menu__info">
        <LanguageSwitcher />

        <div className="top-menu__datetime">
          <span className="top-menu__date">
            {formattedDate}
          </span>

          <span className="top-menu__time">
            {formattedTime}
          </span>
        </div>

        <div className="top-menu__sessions">
          <span
            className={`top-menu__connection ${
              socketConnected
                ? 'top-menu__connection--online'
                : ''
            }`}
            aria-hidden="true"
          />

          <span className="top-menu__sessions-label">
            {t('topMenu.activeSessions')}
          </span>

          <span className="top-menu__sessions-count">
            {activeSessions ?? '—'}
          </span>
        </div>

        {user && (
          <div className="top-menu__auth">
            <span className="top-menu__user">
              {user.name}
            </span>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              {t('auth.logout')}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

