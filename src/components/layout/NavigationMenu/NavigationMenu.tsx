'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import './NavigationMenu.scss';

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

export const NavigationMenu = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <aside className="navigation-menu">
      <div className="navigation-menu__logo">
        <span className="navigation-menu__logo-mark">O&P</span>
      </div>

      <nav className="navigation-menu__nav">
        {navigationItems.map(({ href, labelKey }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`navigation-menu__link ${
                isActive ? 'navigation-menu__link--active' : ''
              }`}
            >
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
