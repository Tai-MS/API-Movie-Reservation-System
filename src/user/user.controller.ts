import { Body, Controller, Get, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/authGuard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUser')
  @UseGuards(AuthGuard)
  getUser(@Body() email: { email: string }) {
    return this.userService.getUser(email.email);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers() {
    return 'users';
  }

  @Post()
  createUser(
    @Body() data: { username: string; password: string; email: string },
  ) {
    const createUser = this.userService.createUser(data);
    return createUser;
  }

  @Put('/update')
  @UseGuards(AuthGuard)
  updateUser(
    @Body() data: { username: string; email: string; password: string },
  ) {
    const updateUser = this.userService.updateUser(data);
    return updateUser;
  }

  @Put('/delete')
  @UseGuards(AuthGuard)
  deleteUser(@Body() email: { email: string }) {
    const deleteUser = this.userService.deleteUser(email.email);
    return deleteUser;
  }

  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: { email: string; password: string },
  ) {
    const loginData = {
      email: data.email,
      password: data.password,
      response: response,
    };
    const user = await this.userService.login(loginData);
    return user;
  }
}
