import { Connection, createConnections } from 'typeorm';
import { connectionOptions } from './configs';

export const appConnection = async (): Promise<{ connections: Connection[] | null, errorCode: string }> => {
  let retries = 1;
  let connections = null;
  let errorCode = '';

  while (retries) {
    try {
      connections = await createConnections(connectionOptions);

      return { connections, errorCode };
    } catch (err) {

      console.log('ERROR', err);
      retries -= 1;
      console.log(`retries left: ${retries}`);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      errorCode = err.code;
    }
  }

  return { connections, errorCode };
};
