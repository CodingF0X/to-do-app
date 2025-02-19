import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(body: CreateUserDto): Promise<User> {
    const { userName, password } = body;

    const userExists = await this.userRepository.findByUserName(userName);
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const salt_ = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt_);
    return this.userRepository.createUser({
      userName,
      password: hashedPassword,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
