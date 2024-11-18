import { Injectable, BadRequestException } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async createTicket(data: {
    user_id: number;
    room_id: number;
    movie_id: number;
  }): Promise<Ticket> {
    try {
      const ticket = await this.prisma.ticket.create({
        data: {
          movie_id: data.movie_id,
          room_id: data.room_id,
          user_id: data.user_id,
        },
      });
      return ticket;
    } catch (error) {
      if (error.code) {
        throw new BadRequestException(
          'Error creating ticket: Check your input data.',
        );
      }
      throw new Error('An unexpected error occurred');
    }
  }
}
