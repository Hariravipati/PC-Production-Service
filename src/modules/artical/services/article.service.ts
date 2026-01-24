import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { ArticleEntity } from '../entities/article.entity';
import { BaseService } from '../../../common/services/base.service';

@Injectable()
export class ArticleService extends BaseService {
  constructor(private readonly articleRepository: ArticleRepository) {
    super();
  }

  async createArticle(article: Partial<ArticleEntity>, userId: number): Promise<ArticleEntity> {
    this.validateUserId(userId);
    return this.articleRepository.insert(article, userId);
  }

  async updateArticle(articleNo: number, article: Partial<ArticleEntity>, userId: number): Promise<ArticleEntity> {
    this.validateUserId(userId);
    return this.articleRepository.update(articleNo, article, userId);
  }

  async deleteArticle(articleNo: number, userId: number): Promise<void> {
    this.validateUserId(userId);
    return this.articleRepository.delete(articleNo, userId);
  }

  async getArticle(articleNo: number, userId: number): Promise<ArticleEntity> {
    this.validateUserId(userId);
    const article = await this.articleRepository.findOne(articleNo, userId);
    if (!article) {
      this.throwNotFound(`Article ${articleNo}`);
    }
    return article;
  }

  async getAllArticles(userId: number): Promise<ArticleEntity[]> {
    this.validateUserId(userId);
    return this.articleRepository.findAll(userId);
  }
}