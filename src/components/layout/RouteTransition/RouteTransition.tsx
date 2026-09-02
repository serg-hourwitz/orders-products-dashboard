'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import './RouteTransition.scss';

interface RouteTransitionProps {
  children: ReactNode;
}

export const RouteTransition = ({ children }: RouteTransitionProps) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className="route-transition"
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.18,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};
