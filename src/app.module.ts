import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_PORT:', process.env.DB_PORT);
        console.log('DB_USERNAME:', process.env.DB_USERNAME);
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
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
        };
      },
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule { }