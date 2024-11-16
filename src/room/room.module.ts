import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from '../middleware/verifyToken';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, AuthService],
})
export class RoomModule {}
