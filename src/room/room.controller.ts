import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomStatus } from '@prisma/client';
import { AuthGuard } from 'src/guards/authGuard';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @UseGuards(AuthGuard)
  getRoom(@Body() data: { id?: number; capacity?: number }) {
    const response = this.roomService.getRoom(data);
    return response;
  }

  @Post()
  @UseGuards(AuthGuard)
  createRoom(@Body() data: { capacity: number; status: RoomStatus }) {
    const response = this.roomService.addRoom(data);
    return response;
  }

  @Put()
  @UseGuards(AuthGuard)
  updateRoom(
    @Body()
    data: {
      id: number;
      status?: RoomStatus;
      freeSits: number;
      calendar_id?: number;
    },
  ) {
    const response = this.roomService.updateRoom(data);
    return response;
  }
}
