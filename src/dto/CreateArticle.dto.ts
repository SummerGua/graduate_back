import { IsDate, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
  @IsDate()
  readonly createAt: Date;
  @IsDate()
  readonly updateAt: Date;
}
