'use client';

import Image from 'next/image';
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
      <div className="navigation-menu__profile">
        <div className="navigation-menu__avatar">
          <Image
            src="/images/profile/my_photo.jpg"
            alt="Serhiy Hourvitz"
            fill
            priority
            sizes="112px"
            className="navigation-menu__avatar-image"
          />
        </div>

        <div className="navigation-menu__profile-info">
          <h2 className="navigation-menu__name">Serhiy Hourvitz</h2>

          <p className="navigation-menu__tagline">
            Code <span>•</span> Structure <span>•</span> Experience
          </p>
        </div>
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
