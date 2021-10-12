import { Tweet, Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './tweet.dto';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  async createTweet(data: CreateTweetDto): Promise<Tweet> {
    return this.db.tweet.create({ data });
  }

  async deleteTweet(where: Prisma.TweetWhereUniqueInput): Promise<Tweet> {
    const { id } = where;

    const tweet = await this.db.tweet.findUnique({
      where: { id },
    });

    if (!tweet) {
      throw new NotFoundException('tweet_not_found');
    }

    return this.db.tweet.delete({ where: { id } });
  }
}
