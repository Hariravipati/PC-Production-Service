import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/artical/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/auth/entities/user.entity';
import {
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
} from './modules/artical/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Pg123456$',
      database: process.env.DB_NAME || 'pc-production-db',
      entities: [
        UserEntity,
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
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule { }