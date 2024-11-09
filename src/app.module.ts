/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { MovieModule } from './movie/movie.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TicketModule,
    RoomModule,
    MovieModule,
    UserModule,
    CalendarModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
