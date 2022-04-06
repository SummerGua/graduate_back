import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/dto/CreateArticle.dto';
import { PaginationQueryDto } from 'src/dto/PaginationQuery.dto';
import { UpdateArticleDto } from 'src/dto/UpdateArticle.dto';
import { JwtGuard } from 'src/guard';
import { ArticleService } from './article.service';

// @UseGuards(JwtGuard)
@Controller('article')
export class ArticlesController {
  constructor(private articleService: ArticleService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    // const { limit, offset } = paginationQueryDto
    return this.articleService.findAll(paginationQueryDto);
  }

  @Post('create')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  upate(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
