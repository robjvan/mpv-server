import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /// Add global prefix to all endpoints
  app.setGlobalPrefix('api/v1');

  /// Handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe()); // Set the config options

  app.enableCors();

  // // Set Swagger configuration
  // const config = new DocumentBuilder()
  //   .setTitle('RecipesAI Platform')
  //   .setDescription('RecipesAI platform API description')
  //   .setVersion('1.0')
  //   // .addTag('')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
