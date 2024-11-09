import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:email')
  getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  @Get()
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
}
