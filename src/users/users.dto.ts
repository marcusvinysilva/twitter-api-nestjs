import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  tweets: number[];

  @IsNumber()
  @IsOptional()
  follows: number[];

  @IsNumber()
  @IsOptional()
  likes: number[];

  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(5, 30)
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  @Length(8, 30)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @Length(20, 25)
  @IsNotEmpty()
  birth: string;

  @IsString()
  @Length(2, 120)
  @IsNotEmpty()
  bio: string;
}
