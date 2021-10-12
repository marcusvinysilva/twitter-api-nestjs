import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  followedId: number;
}
