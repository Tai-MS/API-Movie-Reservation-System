import { Injectable } from '@nestjs/common';
import { MovieStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async addMovie(data: {
    title: string;
    description: string;
    duration: number;
    calendar_id: number;
    status: MovieStatus;
  }) {
    try {
      return this.prisma.movie.create({
        data: {
          title: data.title,
          description: data.description,
          duration: data.duration,
          calendar_id: data.calendar_id,
          status: data.status,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async getMovie(data: { id?: number; title?: string }) {
    try {
      console.log(data);

      if (data.id !== undefined) {
        return this.prisma.movie.findFirst({
          where: {
            id: data.id,
          },
        });
      }
      return this.prisma.movie.findFirst({
        where: {
          title: data.title,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateMovie(
    data: Partial<{
      id: number;
      title: string;
      description: string;
      calendar_id: number;
      status: MovieStatus;
    }>,
  ) {
    try {
      const movie = await this.getMovie({ id: data.id, title: data.title });
      if (!movie) {
        return 'Movie not found';
      }

      const isDataDifferent = Object.entries(data).some(
        ([key, value]) => movie[key] !== value,
      );

      if (isDataDifferent) {
        await this.prisma.movie.update({
          where: { id: data.id },
          data: data,
        });
        return 'Movie updated';
      }
    } catch (error) {
      return error;
    }
  }

  async deleteMovie(data: { id?: number; title?: string }) {
    try {
      return this.updateMovie({
        ...data,
        status: MovieStatus.UNAVAILABLE,
      });
    } catch (error) {
      return error;
    }
  }
}
