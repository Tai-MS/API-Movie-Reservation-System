import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from '../middleware/verifyToken';

@Module({
  controllers: [TicketController],
  providers: [TicketService, PrismaService, AuthService],
})
export class TicketModule {}
