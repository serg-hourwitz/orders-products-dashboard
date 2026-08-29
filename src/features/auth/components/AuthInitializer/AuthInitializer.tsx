'use client';

import { useEffect } from 'react';

import {
  loadSession,
} from '@/features/auth/authSlice';
import {
  selectAuthInitialized,
} from '@/features/auth/authSelectors';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({
  children,
}: AuthInitializerProps) => {
  const dispatch = useAppDispatch();

  const initialized = useAppSelector(
    selectAuthInitialized,
  );

  useEffect(() => {
    if (!initialized) {
      void dispatch(loadSession());
    }
  }, [dispatch, initialized]);

  return children;
};
