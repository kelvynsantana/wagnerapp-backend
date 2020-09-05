import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: UserDTO): Promise<User> {
    const user = await this.userService.createUser(newUser);

    return user;
  }
}
