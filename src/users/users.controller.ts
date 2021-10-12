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
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return this.service.create(createUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Get('list/:id')
  async findUnique(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: CreateUserDto,
  ): Promise<User> {
    return this.service.update(id, updateUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  deleteOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.deleteOneUser({ id: id });
  }
}
