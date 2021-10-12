import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLikeDto } from './like.dto';
import { LikesService } from './likes.service';
import { Like } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(private service: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('like')
  async createTweet(@Body() like: CreateLikeDto, @Req() Req): Promise<Like> {
    const user = Req.user.id;

    return this.service.like(like, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('deslike/:id')
  async deslike(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Like> {
    const user = Req.user.id;

    return this.service.deslike(id, user);
  }
}
