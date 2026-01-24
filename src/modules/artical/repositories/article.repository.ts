import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticleRepository {
  private readonly logger = new Logger(ArticleRepository.name);

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  async insert(article: Partial<ArticleEntity>, userId: number): Promise<ArticleEntity> {
    this.logger.log(`User ${userId} creating article`);
    const articleWithUser = { ...article, createdBy: userId.toString() };
    return this.articleRepo.save(articleWithUser);
  }

  async update(articleNo: number, article: Partial<ArticleEntity>, userId: number): Promise<ArticleEntity> {
    this.logger.log(`User ${userId} updating article ${articleNo}`);
    const existingArticle = await this.articleRepo.findOne({ where: { articleNo } });
    if (!existingArticle) {
      throw new Error(`Article ${articleNo} not found`);
    }
    const articleWithUser = { ...article, updatedBy: userId.toString() };
    await this.articleRepo.update(articleNo, articleWithUser);
    return this.findOne(articleNo, userId);
  }

  async delete(articleNo: number, userId: number): Promise<void> {
    this.logger.log(`User ${userId} deleting article ${articleNo}`);
    const existingArticle = await this.articleRepo.findOne({ where: { articleNo } });
    if (!existingArticle) {
      throw new Error(`Article ${articleNo} not found`);
    }
    await this.articleRepo.delete(articleNo);
  }

  async findOne(articleNo: number, userId: number): Promise<ArticleEntity> {
    this.logger.log(`User ${userId} fetching article ${articleNo}`);
    return this.articleRepo.findOne({ where: { articleNo } });
  }

  async findAll(userId: number): Promise<ArticleEntity[]> {
    this.logger.log(`User ${userId} fetching all articles`);
    return this.articleRepo.find();
  }
}