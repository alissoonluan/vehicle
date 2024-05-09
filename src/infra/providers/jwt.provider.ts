import {
  JwtTokenSigninConfig,
  JwtTokenVerifyConfig,
} from '@config/jwt-token.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

export interface JwtServiceInterface {
  encryptToken(plaintext: Record<string, any>): Promise<string>;
  decryptToken(ciphertext: string): Promise<any>;
  getExpirationDuration(token: string): Promise<number>;
}


@Injectable()
export class JwtProvider implements JwtServiceInterface {
  constructor(private readonly jwtService: JwtService) { }
  async encryptToken(plaintext: Record<string, any>): Promise<string> {
    return this.jwtService.sign({ ...plaintext }, JwtTokenSigninConfig);
  }

  async decryptToken(ciphertext: string): Promise<jwt.JwtPayload> {
    return this.jwtService.verify(ciphertext, JwtTokenVerifyConfig);
  }

  async getExpirationDuration(token: string): Promise<number> {
    const SECONDS_TO_MILLISECONDS = 1000;
    const decoded = await this.decryptToken(token);
    return decoded.exp - Math.floor(Date.now() / SECONDS_TO_MILLISECONDS);
  }
}
