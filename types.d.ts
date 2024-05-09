import { User } from '@application/entities/user';
import 'express';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
