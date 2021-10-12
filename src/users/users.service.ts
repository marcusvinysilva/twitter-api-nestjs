import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.dto';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
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

  async findUnique(id: number): Promise<User> {
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
      },
    });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    delete user.password;

    return user;
  }

  async update(id: number, data: CreateUserDto): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async deleteOneUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const { id } = where;

    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return this.db.user.delete({ where: { id } });
  }
}
