import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(body: AuthCredentialsDto): Promise<User> {
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

  async signIn(body: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { userName, password } = body;
    const user = await this.userRepository.findByUserName(userName);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
