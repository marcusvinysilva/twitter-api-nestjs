import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFollowDto } from './follow.dto';
import { Follow } from '.prisma/client';

@Injectable()
export class FollowersService {
  constructor(private db: PrismaService) {}

  async follow(data: CreateFollowDto, user: number): Promise<Follow> {
    return await this.db.follow.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }

  async unfollow(id: number, userId: number): Promise<Follow> {
    const userFollow = await this.db.follow.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userFollow) {
      throw new NotFoundException();
    }

    if (userFollow.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.db.follow.delete({
      where: { id },
    });
  }
}
