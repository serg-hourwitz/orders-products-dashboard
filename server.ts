import { createServer } from 'node:http';

import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';

const hostname = process.env.HOSTNAME ?? '0.0.0.0';
const port = Number(process.env.PORT ?? 3000);

const startServer = async () => {
  const app = next({
    dev,
    hostname,
    port,
  });

  const handle = app.getRequestHandler();

  await app.prepare();

  const httpServer = createServer((request, response) => {
    handle(request, response);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: dev ? '*' : false,
    },
  });

  const emitActiveSessions = () => {
    const activeSessions = io.of('/').sockets.size;

    io.emit('active-sessions', activeSessions);
  };

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    emitActiveSessions();

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);

      setTimeout(() => {
        emitActiveSessions();
      }, 0);
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Server ready on http://${hostname}:${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
