import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Hola! Bienvenido a la BAQ API con NestJS y Swagger';
  }
}
