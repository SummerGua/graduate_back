import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateArticleDto } from './CreateArticle.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsOptional()
  @IsDate()
  createAt: Date;
} // 继承属性和校验规则
