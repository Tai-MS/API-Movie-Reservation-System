import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from '../middleware/verifyToken';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService, AuthService],
})
export class MovieModule {}
