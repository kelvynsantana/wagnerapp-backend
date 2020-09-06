import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../interfaces/jwt.interface';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.authService.validateUser(payload);

    return user;
  }
}
