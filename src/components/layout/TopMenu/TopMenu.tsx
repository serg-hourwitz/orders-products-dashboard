'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher/LanguageSwitcher';

import { logout } from '@/features/auth/authSlice';
import { selectAuthUser } from '@/features/auth/authSelectors';

import { useActiveSessions } from '@/hooks/useActiveSessions';

import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';

import { Button } from '@/components/ui/Button/Button';
import { IconButton } from '@/components/ui/IconButton/IconButton';

import './TopMenu.scss';

const getCurrentDate = () => new Date();

const navigationItems = [
  {
    href: '/orders',
    labelKey: 'navigation.orders',
  },
  {
    href: '/products',
    labelKey: 'navigation.products',
  },
] as const;

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useTranslation();

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const {
    count: activeSessions,
    connected: socketConnected,
  } = useActiveSessions();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

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

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      setIsMobileMenuOpen(false);

      window.location.replace('/login');
    }
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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

          {user && (
            <div className="top-menu__auth">
              <span className="top-menu__user">{user.name}</span>

              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                {t('auth.logout')}
              </Button>
            </div>
          )}
        </div>

        <IconButton
          className={`top-menu__burger ${
            isMobileMenuOpen ? 'top-menu__burger--open' : ''
          }`}
          aria-label={
            isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={handleToggleMobileMenu}
        >
          <span />
          <span />
          <span />
        </IconButton>
      </header>

      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={handleCloseMobileMenu}
        />

        <aside id="mobile-navigation" className="mobile-menu__drawer">
          <div className="mobile-menu__header">
            <strong>{t('topMenu.title')}</strong>

            <IconButton
              className="mobile-menu__close"
              aria-label="Close navigation menu"
              onClick={handleCloseMobileMenu}
            >
              ×
            </IconButton>
          </div>

          <nav className="mobile-menu__nav">
            {navigationItems.map(({ href, labelKey }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-menu__link ${
                    isActive ? 'mobile-menu__link--active' : ''
                  }`}
                  onClick={handleCloseMobileMenu}
                >
                  {t(labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="mobile-menu__section">
            <span className="mobile-menu__label">Language</span>

            <LanguageSwitcher />
          </div>

          <div className="mobile-menu__section">
            <span className="mobile-menu__label">{formattedDate}</span>

            <strong>{formattedTime}</strong>
          </div>

          <div className="mobile-menu__section">
            <div className="mobile-menu__sessions">
              <span
                className={`top-menu__connection ${
                  socketConnected ? 'top-menu__connection--online' : ''
                }`}
                aria-hidden="true"
              />

              <span>{t('topMenu.activeSessions')}</span>

              <strong>{activeSessions ?? '—'}</strong>
            </div>
          </div>

          {user && (
            <div className="mobile-menu__auth">
              <span className="mobile-menu__user">{user.name}</span>

              <Button variant="outline-danger" onClick={handleLogout}>
                {t('auth.logout')}
              </Button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};
