import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthParams } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { errorHandler } from 'src/helpers/errorHandler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  signUp(userSignup: AuthParams): Promise<void> {
    return this.usersRepository.createUser(userSignup);
  }

  async signIn({
    username,
    password,
  }: AuthParams): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await this.jwtService.sign({ username });
      return { accessToken };
    }
    return errorHandler(403);
  }
}
