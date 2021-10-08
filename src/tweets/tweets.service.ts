import { Tweet, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.TweetCreateInput): Promise<Tweet> {
    return this.db.tweet.create({ data });
  }
}
