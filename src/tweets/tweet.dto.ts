import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @Length(2, 280)
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  likes: number[];
}
