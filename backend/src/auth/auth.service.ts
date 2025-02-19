import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
