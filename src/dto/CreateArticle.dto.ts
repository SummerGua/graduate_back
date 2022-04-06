import { IsDate, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
  @IsDate()
  readonly createdAt: Date;
  @IsDate()
  readonly updatedAt: Date;
  @IsString()
  readonly author: string;
}
