import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './create-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Post('signin')
  async signIn(
    @Body() body: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }

  @Post('mmea')
  @UseGuards(AuthGuard())
  mmea(@GetUser() user: User) {
    console.log(user);
  }
}
