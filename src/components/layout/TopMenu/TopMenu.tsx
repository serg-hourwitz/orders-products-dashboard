'use client';

import { useEffect, useState } from 'react';

import { useActiveSessions } from '@/hooks/useActiveSessions';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher/LanguageSwitcher';

import { useTranslation } from 'react-i18next';

import './TopMenu.scss';

const getCurrentDate = () => new Date();

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  const { t } = useTranslation();

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


  const { count: activeSessions, connected: socketConnected } =
    useActiveSessions();

  return (
    <header className="top-menu">
      <div className="top-menu__brand">
        <span className="top-menu__brand-title">{t('topMenu.title')}</span>
      </div>

      <div className="top-menu__info">
        <LanguageSwitcher />

        <div className="top-menu__datetime">
          <span className="top-menu__date">{formattedDate}</span>
          <span className="top-menu__time">{formattedTime}</span>
        </div>

        <div className="top-menu__sessions">
          <span
            className={`top-menu__connection ${
              socketConnected ? 'top-menu__connection--online' : ''
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
      </div>
    </header>
  );
};
