'use client';

import { useEffect, useState } from 'react';

import './TopMenu.scss';

const getCurrentDate = () => new Date();

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

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

  return (
    <header className="top-menu">
      <div className="top-menu__brand">
        <span className="top-menu__brand-title">Orders & Products</span>
      </div>

      <div className="top-menu__info">
        <div className="top-menu__datetime">
          <span className="top-menu__date">{formattedDate}</span>
          <span className="top-menu__time">{formattedTime}</span>
        </div>

        <div className="top-menu__sessions">
          <span className="top-menu__sessions-label">Active sessions</span>
          <span className="top-menu__sessions-count">—</span>
        </div>
      </div>
    </header>
  );
};
