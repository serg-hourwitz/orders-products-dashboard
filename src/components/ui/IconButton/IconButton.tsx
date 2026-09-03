'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './IconButton.scss';

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label'
> {
  'aria-label': string;
  children: ReactNode;
}

export const IconButton = ({
  children,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) => {
  const classes = ['icon-button', className].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};
