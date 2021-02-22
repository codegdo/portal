import { Connection, createConnections } from 'typeorm';
import { connections } from './configs';

export const appConnection = async (): Promise<Connection[] | null> => {
  let retries = 5;
  while (retries) {
    try {
      return createConnections(connections);
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  return null;
};
