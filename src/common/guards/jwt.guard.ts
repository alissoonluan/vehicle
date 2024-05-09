import { IS_PUBLIC_KEY } from '@decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: 'Token not found',
      });
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      if (!decodedToken) {
        throw new UnauthorizedException({
          message: 'Invalid token',
        });
      }

      request.user = decodedToken;
      return true;
    } catch (error) {
      console.log(error, 'error');
      throw new UnauthorizedException({
        message: 'Invalid token',
      });
    }
  }
  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
