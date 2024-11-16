import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async verifyToken(data: { token: string; email: string }) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          token: data.token,
          email: data.email,
          token_lifetime: {
            gt: new Date(),
          },
        },
      });

      if (!findUser) {
        throw new Error('Token is invalid or expired');
      }

      return true;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Failed to verify token');
    }
  }
}
