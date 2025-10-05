# BAQ API - NestJS con Swagger

Una API de ejemplo creada con NestJS que incluye documentación automática con Swagger y endpoints de health check.

## 🚀 Características

- **NestJS Framework**: Framework Node.js robusto y escalable
- **Swagger/OpenAPI**: Documentación automática de la API
- **Health Checks**: Endpoints para monitoreo de la aplicación
- **TypeScript**: Tipado estático para mayor robustez

## 📋 Endpoints Disponibles

### Health Checks
- `GET /health` - Estado general de la aplicación
- `GET /health/readiness` - Verificar si está lista para recibir tráfico
- `GET /health/liveness` - Verificar si la aplicación está viva

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario

## 🛠️ Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

3. **Acceder a la documentación:**
   - API: http://localhost:3000
   - Swagger UI: http://localhost:3000/api

## 🔍 ¿Por qué existe el endpoint `/health`?

El endpoint `/health` **NO se crea automáticamente** por NestJS o Swagger. Es una **práctica recomendada** que implementamos manualmente para:

- **Monitoreo**: Verificar que la aplicación esté funcionando
- **DevOps**: Integración con sistemas de orquestación (Kubernetes, Docker)
- **Observabilidad**: Detectar problemas antes de que afecten a los usuarios
- **Load Balancers**: Verificar el estado antes de enviar tráfico

## 📚 Documentación Swagger

La documentación está disponible en: http://localhost:3000/api

Incluye:
- Descripción de todos los endpoints
- Esquemas de request/response
- Ejemplos de uso
- Códigos de estado HTTP
