import { Controller, Body, Get, Post, Param, Delete } from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Get(':username')
  findUnique(@Param('username') username: string): Promise<User> {
    return this.service.findUnique(username);
  }

  @Get()
  findMany(): Promise<User[]> {
    return this.service.findMany();
  }

  @Delete(':username')
  deleteOneUser(@Param('username') username: string): Promise<User> {
    return this.service.deleteOneUser(username);
  }
}
