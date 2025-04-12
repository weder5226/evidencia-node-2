import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

type PayloadType = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token == null) {
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const payload = await this.tokenService.verifyAsync<PayloadType>(token, {
        secret: process.env.TOKEN_SECRET,
        ignoreExpiration: false,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token error');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
