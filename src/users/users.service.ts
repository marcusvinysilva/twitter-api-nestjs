import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findUniqueUser(id: number): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
      include: {
        follows: {
          select: {
            followedId: true,
          },
        },
        tweets: {
          select: {
            text: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    delete user.password;

    return user;
  }

  async updateUser(id: number, data: CreateUserDto): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return await this.db.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const userAuth = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!userAuth) {
      throw new NotFoundException();
    }

    if (userAuth.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.user.delete({
      where: { id },
    });
  }
}
