/* //import debug from 'debug';
import { createServer } from 'http';

import app from './app';

(async (): Promise<void> => {
  const server = createServer(await app());

  server.listen(5000, () => {
    console.log('Listening on port 5000');
  });
})();
 */

import express from 'express';
const app = express()

app.get('/', function (_req, res) {
  res.send('Hello World')
})

app.listen(3000)