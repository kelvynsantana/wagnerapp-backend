import { User } from 'src/user/entities/user.entity';

export interface LoginStatus {
  readonly user: User;
  readonly token: string;
}
