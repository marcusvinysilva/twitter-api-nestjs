import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFollowDto } from './follow.dto';
import { FollowersService } from './followers.service';
import { Follow } from '.prisma/client';

@Controller('followers')
export class FollowersController {
  constructor(private db: FollowersService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('follow')
  async create(@Body() data: CreateFollowDto, @Req() Req): Promise<Follow> {
    const user = Req.user.id;
    return this.db.follow(data, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('unfollow/:id')
  async unfollow(
    @Param('id', ParseIntPipe) id: number,
    @Req() Req,
  ): Promise<Follow> {
    const followId = Req.user.id;

    return this.db.unfollow(id, followId);
  }
}
