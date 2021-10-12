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
  async createTweet(@Body() createTweet: CreateTweetDto): Promise<Tweet> {
    return this.service.createTweet(createTweet);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteTweet(@Param('id', ParseIntPipe) id: number): Promise<Tweet> {
    return this.service.deleteTweet({ id: id });
  }
}
