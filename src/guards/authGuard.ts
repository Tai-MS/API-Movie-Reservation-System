import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../middleware/verifyToken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies['auth-token'];
    console.log(token);

    if (!token) {
      console.log('No auth-token cookie found');
      return false;
    }

    try {
      const user = await this.authService.verifyToken(token);
      if (!user) {
        console.log('Token verification failed');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error during token verification:', error);
      return false;
    }
  }
}
