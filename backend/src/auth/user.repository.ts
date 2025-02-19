import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  // constructor(private dataSource: DataSource) {
  //   super(User, dataSource.createEntityManager());
  // }

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    return await this.userRepository.save(body);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findByUserName(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userName } });
    return user;
  }
}
