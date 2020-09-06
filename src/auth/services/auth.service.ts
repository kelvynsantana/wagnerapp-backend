import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { LoginUserInterface } from '../interfaces/login-user.interface';
import { LoginStatus } from '../interfaces/login-status.interface';
import { JwtPayload } from '../interfaces/jwt.interface';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserInterface): Promise<LoginStatus> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new HttpException('Invalid email or password', 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new HttpException('Invalid email or password', 401);

    const token = this.createToken(user);

    return {
      user,
      ...token,
    };
  }

  private createToken({ id }: UserDTO): any {
    const user: JwtPayload = { userId: id };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }

  async validateUser({ userId }: JwtPayload): Promise<UserDTO> {
    const user = await this.userService.findUserByID(userId);

    if (!user) throw new HttpException('Invalid token', 401);

    return user;
  }
}
