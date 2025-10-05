import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('BAQ API')
    .setDescription('API de ejemplo con NestJS y Swagger')
    .setVersion('1.0')
    .addTag('health', 'Endpoints de salud y monitoreo')
    .addTag('users', 'Gestión de usuarios')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Aplicación ejecutándose en: http://localhost:3000');
  console.log('📚 Documentación Swagger: http://localhost:3000/api');
}
bootstrap();
