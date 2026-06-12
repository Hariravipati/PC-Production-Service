import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { GlobalValidationPipe } from './common/pipes/validation.pipe';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    logger.log('Starting Polar Canvas Production Service...');
    
    const app = await NestFactory.create(AppModule);
    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173,https://production.polarcanvas.in')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);

    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    logger.log('NestJS application created successfully');

    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalPipes(new GlobalValidationPipe());
    
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new JwtAuthGuard(reflector));
    logger.log('Global filters, interceptors, pipes and guards registered');

    const config = new DocumentBuilder()
      .setTitle('Polar Canvas Production Service API-WithAuth')
      .setDescription('NestJS Polar Canvas Production Service with MSSQL')
      .setVersion('1.0')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    logger.log('Swagger documentation configured at /api');

    const port = process.env.PORT || 3002;
    await app.listen(port);
    logger.log(`Application is running on port: ${port}`);
    logger.log('Swagger UI available at: /api');
    logger.log('Polar Canvas Production Service started successfully');
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}
bootstrap();