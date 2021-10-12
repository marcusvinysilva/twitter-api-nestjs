import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Like } from '.prisma/client';
import { CreateLikeDto } from './like.dto';

@Injectable()
export class LikesService {
  constructor(private db: PrismaService) {}

  async like(data: CreateLikeDto, user: number): Promise<Like> {
    return await this.db.like.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }

  async deslike(id: number, user: number): Promise<Like> {
    const userLike = await this.db.like.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userLike) {
      throw new NotFoundException();
    }

    if (userLike.userId != user) {
      throw new UnauthorizedException();
    }

    return this.db.like.delete({ where: { id } });
  }
}
