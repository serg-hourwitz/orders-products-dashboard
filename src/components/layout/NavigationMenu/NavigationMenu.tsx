'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './NavigationMenu.scss';

const navigationItems = [
  {
    href: '/orders',
    label: 'Orders',
  },
  {
    href: '/products',
    label: 'Products',
  },
];

export const NavigationMenu = () => {
  const pathname = usePathname();

  return (
    <aside className="navigation-menu">
      <div className="navigation-menu__logo">
        <span className="navigation-menu__logo-mark">O&P</span>
      </div>

      <nav className="navigation-menu__nav">
        {navigationItems.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`navigation-menu__link ${
                isActive ? 'navigation-menu__link--active' : ''
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
