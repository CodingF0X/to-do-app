import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const user = this.create(body);

    try {
      const createdUser = await this.save(user);
      return createdUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(
          'User with the same username already exists.',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.find();
    return users;
  }
}
