import { Controller, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: UserDTO): Promise<User> {
    const user = await this.userService.createUser(newUser);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUserData);

    return user;
  }
}
