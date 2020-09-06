import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserInterface } from '../interfaces/login-user.interface';
import { LoginStatus } from '../interfaces/login-status.interface';

@Controller('sessions')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async createSession(
    @Body() credentials: LoginUserInterface,
  ): Promise<LoginStatus> {
    return await this.authService.login(credentials);
  }
}
