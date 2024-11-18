import { Injectable, BadRequestException } from '@nestjs/common';
import { Movie, MovieStatus } from '@prisma/client';
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
  }): Promise<Movie> {
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
      if (error.code) {
        throw new BadRequestException(
          'Error creating the movie: check your input data.',
        );
      }

      throw new Error('An unexpected error ocurred.');
    }
  }

  async getMovie(data: { id?: number; title?: string }): Promise<Movie> {
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
      if (error.code) {
        throw new BadRequestException(
          'Error getting the movie: check your input data.',
        );
      }

      throw new Error('An unexpected error ocurred.');
    }
  }

  async updateMovie(
    data: Partial<{
      id?: number;
      title?: string;
      description?: string;
      calendar_id?: number;
      status?: MovieStatus;
    }>,
  ): Promise<string> {
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
      if (error.code) {
        throw new BadRequestException(
          'Error updating the movie: check your input data.',
        );
      }

      throw new Error('An unexpected error ocurred.');
    }
  }

  async deleteMovie(data: { id?: number; title?: string }): Promise<string> {
    try {
      const movieToDelete = this.updateMovie({
        ...data,
        status: MovieStatus.UNAVAILABLE,
      });

      if (!movieToDelete) {
        throw new Error('Error deleting the movie: check your input data.');
      }

      return `Movie ${data.id ? `with ID ${data.id}` : `titled "${data.title}"`} deleted.`;
    } catch (error) {
      if (error.code) {
        throw new BadRequestException(
          'Error deleting the movie: check your input data.',
        );
      }

      throw new Error('An unexpected error ocurred.');
    }
  }
}
