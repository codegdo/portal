//import debug from 'debug';
import { createServer } from 'http';

import app from './app';

const startServer = async (): Promise<void> => {
  const server = createServer(await app());

  server.listen(5000, () => {
    console.log('Listening on port 5000');
  });
};

void startServer();