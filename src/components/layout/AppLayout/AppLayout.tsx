import type { ReactNode } from 'react';

import { NavigationMenu } from '@/components/layout/NavigationMenu/NavigationMenu';
import { RouteTransition } from '@/components/layout/RouteTransition/RouteTransition';
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

      <main className="app-layout__content">
        <RouteTransition>{children}</RouteTransition>
      </main>
    </div>
  );
};
