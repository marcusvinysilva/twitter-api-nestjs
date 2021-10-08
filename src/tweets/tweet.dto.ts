import { IsString, Length } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @Length(2, 280)
  texto: string;

  criadoEm: Date;

  @IsString()
  User: string;
}
