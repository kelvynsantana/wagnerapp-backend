import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { HashProvider } from '../providers/hash.provider';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private hashProvider: HashProvider,
  ) {}

  public async createUser(newUser: UserDTO): Promise<User> {
    const userExist = await this.findUserByEmail(newUser.email);

    if (userExist) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(
      newUser.password,
    );

    const user = this.usersRepository.create({
      ...newUser,
      password: hashedPassword,
    });

    const userCreated = await this.usersRepository.save(user);

    delete userCreated.password;

    return userCreated;
  }

  public async updateUser(
    id: string,
    updatedUser: UpdateUserDTO,
  ): Promise<User> {
    const userExist = await this.findUserByID(id);

    if (!userExist) throw new HttpException('User does not exists', 400);

    if (updatedUser.email) {
      const emailInUse = await this.findUserByEmail(updatedUser.email);

      if (emailInUse) throw new HttpException('Email in use', 400);
    }

    await this.usersRepository.update(userExist, { ...updatedUser });

    const user = this.usersRepository.create({ ...userExist, ...updatedUser });

    return user;
  }

  public async findUserByID(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    return user;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }
}
