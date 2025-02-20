import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private UserRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.UserRepository.findByUserName(payload.userName);
    if (!user) {
      throw new UnauthorizedException('Ivalid credentials');
    }

    return user;
  }
}
