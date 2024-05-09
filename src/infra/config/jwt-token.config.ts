import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { env } from './env.config';

export const JwtTokenSigninConfig: JwtSignOptions = {
  expiresIn: env.jwtExpiresIn,
  secret: env.jwtSecret,
};

export const JwtTokenVerifyConfig: JwtVerifyOptions = {
  secret: env.jwtSecret,
};
