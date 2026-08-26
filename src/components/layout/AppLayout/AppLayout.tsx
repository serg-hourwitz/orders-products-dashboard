import type { ReactNode } from 'react';

import { NavigationMenu } from '@/components/layout/NavigationMenu/NavigationMenu';
import { TopMenu } from '@/components/layout/TopMenu/TopMenu';

import './AppLayout.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="app-layout">
      <NavigationMenu />
      <TopMenu />

      <main className="app-layout__content">{children}</main>
    </div>
  );
};
