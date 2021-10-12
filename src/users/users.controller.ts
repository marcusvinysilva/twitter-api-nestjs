import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Patch,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post('create')
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.service.createUser(createUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Get('list/:id')
  async findUniqueUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.findUniqueUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: CreateUserDto,
  ): Promise<User> {
    return this.service.updateUser(id, updateUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.deleteUser(id);
  }
}
