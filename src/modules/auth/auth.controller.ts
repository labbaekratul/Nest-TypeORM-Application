import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignUpUserDto } from './dto/auth.dots';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupBody: CreateUserDto): Promise<void> {
    return this.authService.signUp(signupBody);
  }

  @Post('signin')
  signIn(@Body() signinBody: SignUpUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinBody);
  }
}
