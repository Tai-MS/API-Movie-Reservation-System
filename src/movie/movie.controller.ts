import {
  Controller,
  UseGuards,
  Get,
  Put,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/authGuard';
import { MovieService } from './movie.service';
import { MovieStatus } from '@prisma/client';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getMovie(@Body() data: { id?: number; title?: string }) {
    const response = await this.movieService.getMovie(data);
    return response;
  }

  @Post()
  @UseGuards(AuthGuard)
  async addMovie(
    @Body()
    data: {
      title: string;
      description: string;
      duration: number;
      calendar_id: number;
      status: MovieStatus;
    },
  ) {
    const response = await this.movieService.addMovie(data);
    return response;
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateMovie(
    @Body()
    data: {
      title: string;
      description: string;
      duration: number;
      calendar_id: number;
      status: MovieStatus;
    },
  ) {
    const response = await this.movieService.updateMovie(data);
    return response;
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteMovie(@Body() id: number) {
    const response = await this.movieService.deleteMovie({ id: id });
    return response;
  }
}
