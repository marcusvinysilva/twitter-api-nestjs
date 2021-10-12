import { Tweet, Prisma, Like } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './tweet.dto';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  async createTweet(data: CreateTweetDto, user: number): Promise<Tweet> {
    return await this.db.tweet.create({
      data: {
        ...data,
        userId: user,
      },
    });
  }

  async findManyTweets(): Promise<Tweet[]> {
    return await this.db.tweet.findMany({
      include: {
        likes: {
          select: {
            userId: true,
          },
        },
        User: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async deleteTweet(id: number, userId: number): Promise<Tweet> {
    const userTweet = await this.db.tweet.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!userTweet) {
      throw new NotFoundException();
    }

    if (userTweet.userId != userId) {
      throw new UnauthorizedException();
    }

    return this.db.tweet.delete({ where: { id } });
  }
}
