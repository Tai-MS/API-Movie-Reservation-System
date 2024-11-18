import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authGuard';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTicket(
    @Body() data: { user_id: number; room_id: number; movie_id: number },
  ) {
    const response = await this.ticketService.createTicket(data);
    return response;
  }
}
