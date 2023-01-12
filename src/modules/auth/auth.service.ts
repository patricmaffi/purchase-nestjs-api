import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../modules/users/domain/entities/user.entity';
import { UsersService } from '../users/domain/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInfo: User) {
    const user = await this.userService.findByEmail(userInfo.email);

    const payload = { sub: user.id, email: userInfo.email };

    return {
      user: {
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
      access_token: { token: this.jwtService.sign(payload) },
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.userService.findByEmail(email, true);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
