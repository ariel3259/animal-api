import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async Register(@Body() user: UsersDto) {
    return await this.userService.Register(user);
  }

  @Post('auth')
  async Auth(@Body() user: UsersDto) {
    return await this.userService.Auth(user);
  }
}
