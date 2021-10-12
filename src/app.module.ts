import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TweetsModule,
    LikesModule,
    FollowersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
