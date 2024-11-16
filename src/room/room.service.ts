import { Injectable } from '@nestjs/common';
import { Room, RoomStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async addRoom(data: { capacity: number; status: RoomStatus }): Promise<Room> {
    try {
      return await this.prisma.room.create({
        data: {
          status: data.status,
          capacity: data.capacity,
          freeSits: data.capacity,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async getRoom(data: { id?: number; capacity?: number }) {
    try {
      if (data.id !== undefined) {
        return this.prisma.room.findFirst({
          where: {
            id: data.id,
          },
        });
      }
      return this.prisma.room.findMany({
        where: {
          capacity: {
            gte: data.capacity,
          },
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateRoom(data: {
    id: number;
    status?: RoomStatus;
    freeSits?: number;
    calendar_id?: number;
  }) {
    try {
      const id = data.id;
      const room = this.getRoom({ id: id });
      if (!room) {
        return `Error searching room, ${id} not found`;
      }
      const isDataDifferent = Object.entries(data).some(
        ([key, value]) => room[key] !== value,
      );

      if (isDataDifferent) {
        await this.prisma.room.update({
          where: { id: id },
          data: data,
        });
      }
      return `Room ${id} updated.`;
    } catch (error) {
      return error;
    }
  }
}
