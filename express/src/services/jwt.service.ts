import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { privateKey, publicKey } from '../configs';

export interface JwtPayload {
  email: string;
  username: string;
  roleId: number;
  orgId: number;
}

@Service()
export class JwtService {
  sign(payload: any) {
    return jwt.sign(payload, privateKey, {
      expiresIn: 60 * 1000,
      algorithm: 'RS256',
    });
  }

  async verify(token: string) {
    try {
      return jwt.verify(token, publicKey);
    } catch (error) {
      return false;
    }
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true });
  }
}
