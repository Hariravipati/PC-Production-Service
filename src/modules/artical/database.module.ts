import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ItemsEntity } from './entities/items.entity';
import { MeasurementEntity } from './entities/measurement.entity';
import { ItemsMeasurementUnitEntity } from './entities/items-measurement-unit.entity';
import { ItemMasterEntity } from './entities/item-master.entity';
import { SupplyByEntity } from './entities/supply-by.entity';
import { CustomerDetailEntity } from './entities/customer-detail.entity';
import { CustomerReelEntity } from './entities/customer-reel.entity';
import { CustomerReelDetailEntity } from './entities/customer-reel-detail.entity';
import { AddContractorEntity } from './entities/add-contractor.entity';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';

const entities = [
  AddContractorEntity,
  ArticleEntity,
  ItemsEntity,
  MeasurementEntity,
  ItemsMeasurementUnitEntity,
  ItemMasterEntity,
  SupplyByEntity,
  CustomerDetailEntity,
  CustomerReelEntity,
  CustomerReelDetailEntity,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ArticleRepository, ArticleService],
  controllers: [ArticleController],
  exports: [TypeOrmModule, ArticleService],
})
export class DatabaseModule {}

export {
  AddContractorEntity,
  ArticleEntity,
  ItemsEntity,
  MeasurementEntity,
  ItemsMeasurementUnitEntity,
  ItemMasterEntity,
  SupplyByEntity,
  CustomerDetailEntity,
  CustomerReelEntity,
  CustomerReelDetailEntity,
};