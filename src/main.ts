import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = 3000
  const app = await NestFactory.create(AppModule);
  console.log(`Running on port ${PORT}`);
  const config = new DocumentBuilder()
    .setTitle('AppCharge Assignment')
    .setDescription('API description ')
    .setVersion('1.0')
    .addTag('assignment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
