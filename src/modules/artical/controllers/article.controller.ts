import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { ArticleEntity } from '../entities/article.entity';
import { UserId } from '../../auth/decorators/user.decorator';
import { BaseController } from '../../../common/controllers/base.controller';
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto';
import { ResponseDto } from '../../../common/dto/response_dto';

@Controller('articles')
export class ArticleController extends BaseController {
  constructor(private readonly articleService: ArticleService) {
    super();
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @UserId() userId: number): Promise<ResponseDto<ArticleEntity>> {
    this.logUserAction(userId, 'creating article');
    const article = await this.articleService.createArticle(createArticleDto, userId);
    return this.success(article, 'Article created successfully');
  }

  @Put(':articleNo')
  async update(
    @Param('articleNo') articleNo: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @UserId() userId: number,
  ): Promise<ResponseDto<ArticleEntity>> {
    this.logUserAction(userId, 'updating', `article ${articleNo}`);
    const article = await this.articleService.updateArticle(articleNo, updateArticleDto, userId);
    return this.success(article, 'Article updated successfully');
  }

  @Delete(':articleNo')
  async delete(@Param('articleNo') articleNo: number, @UserId() userId: number): Promise<ResponseDto<null>> {
    this.logUserAction(userId, 'deleting', `article ${articleNo}`);
    await this.articleService.deleteArticle(articleNo, userId);
    return this.success(null, 'Article deleted successfully');
  }

  @Get(':articleNo')
  async getOne(@Param('articleNo') articleNo: number, @UserId() userId: number): Promise<ResponseDto<ArticleEntity>> {
    this.logUserAction(userId, 'fetching', `article ${articleNo}`);
    const article = await this.articleService.getArticle(articleNo, userId);
    return this.success(article, 'Article retrieved successfully');
  }

  @Get()
  async getAll(@UserId() userId: number): Promise<ResponseDto<ArticleEntity[]>> {
    this.logUserAction(userId, 'fetching all articles');
    const articles = await this.articleService.getAllArticles(userId);
    return this.success(articles, 'Articles retrieved successfully');
  }
}