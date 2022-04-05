import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.entity';
import { Model } from 'mongoose';
import { CreateArticleDto } from 'src/dto/CreateArticle.dto';
import { UpdateArticleDto } from 'src/dto/UpdateArticle.dto';
import { PaginationQueryDto } from 'src/dto/PaginationQuery.dto';
@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<Article>) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.articleModel.find().skip(offset).limit(limit).exec(); // skip代表偏移 limit代表数量
  }

  async findOne(id: string) {
    const article = await this.articleModel.findOne({ _id: id });
    if (!article) {
      throw new NotFoundException(`article #${id} not found`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const existingArticle = await this.articleModel
      .findOneAndUpdate({ _id: id }, { $set: updateArticleDto }, { new: true }) // new: 使用一次find
      .exec();

    if (!existingArticle) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return existingArticle;
  }

  async remove(id: string) {
    const article = await this.findOne(id);
    return article.remove();
  }
}
