import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponse, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const { username, password } = data;

    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('invalid_credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('invalid_credentials');
    }

    delete user.password;

    return {
      token: this.jwt.sign({ username }),
      user,
    };
  }
}
