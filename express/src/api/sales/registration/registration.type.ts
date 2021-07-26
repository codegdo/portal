import { Session } from 'express-session';

export type UserSession = Session & {
  user: {
    userId: number;
    username: string;
    orgId: number;
  };
};

export type CreateRegInput = {
  userId: number;
  username: string;
  orgId: number;
  programId: number;
};
