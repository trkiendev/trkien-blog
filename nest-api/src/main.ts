import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      app.setGlobalPrefix('api');

      // validation pipe
      app.useGlobalPipes(
            new ValidationPipe({
                  whitelist: true,
                  forbidNonWhitelisted: true,
                  transform: true,
            }),
      );

      // swagger
      const config = new DocumentBuilder()
            .setTitle('NestJS API')
            .setVersion('1.0')
            .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('swagger', app, document);

      await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
