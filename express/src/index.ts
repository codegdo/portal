//import debug from 'debug';
import { createServer } from 'http';

import app from './app';

void (async (): Promise<void> => {
  const server = createServer(await app());

  server.listen(5000, () => {
    console.log('Listening on port 5000');
  });
})();