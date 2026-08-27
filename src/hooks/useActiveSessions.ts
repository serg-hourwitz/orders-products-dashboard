import { useEffect, useState } from 'react';

import { socket } from '@/services/socket';

interface ActiveSessionsState {
  count: number | null;
  connected: boolean;
}

export const useActiveSessions =
  (): ActiveSessionsState => {
    const [count, setCount] =
      useState<number | null>(null);

    const [connected, setConnected] =
      useState(false);

    useEffect(() => {
      const handleConnect = () => {
        setConnected(true);
      };

      const handleDisconnect = () => {
        setConnected(false);
      };

      const handleActiveSessions = (
        activeSessions: number,
      ) => {
        setCount(activeSessions);
      };

      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on(
        'active-sessions',
        handleActiveSessions,
      );

      socket.connect();

      return () => {
        socket.off('connect', handleConnect);
        socket.off(
          'disconnect',
          handleDisconnect,
        );
        socket.off(
          'active-sessions',
          handleActiveSessions,
        );

        socket.disconnect();
      };
    }, []);

    return {
      count,
      connected,
    };
  };
