import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
  Get,
} from '@nestjs/common';
import { CreateTweetDto } from './tweet.dto';
import { Tweet } from '.prisma/client';
import { TweetsService } from './tweets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tweets')
export class TweetsController {
  constructor(private service: TweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('create')
  async createTweet(@Body() text: CreateTweetDto, @Req() Req): Promise<Tweet> {
    const user = Req.user.id;

    return this.service.createTweet(text, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Get('list')
  async findManyTweets(): Promise<Tweet[]> {
    return this.service.findManyTweets();
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteTweet(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Tweet> {
    const tweetId = Req.user.id;

    return this.service.deleteTweet(id, tweetId);
  }
}
