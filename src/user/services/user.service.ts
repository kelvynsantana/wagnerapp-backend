import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { HashProvider } from '../providers/hash.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private hashProvider: HashProvider,
  ) {}

  async createUser(newUser: UserDTO): Promise<User> {
    const userExist = await this.usersRepository.findOne({
      where: { email: newUser.email },
    });

    if (userExist) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(
      newUser.password,
    );

    const user = await this.usersRepository.create({
      ...newUser,
      password: hashedPassword,
    });

    const userCreated = await this.usersRepository.save(user);

    delete userCreated.password;

    return userCreated;
  }
}
