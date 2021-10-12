import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService, PrismaService],
})
export class FollowersModule {}
