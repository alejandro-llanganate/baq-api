import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ 
    summary: 'Health Check',
    description: 'Verifica el estado general de la aplicación'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Aplicación funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        info: { 
          type: 'object',
          properties: {
            database: { type: 'object', properties: { status: { type: 'string', example: 'up' } } }
          }
        },
        error: { type: 'object' },
        details: { type: 'object' }
      }
    }
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Aplicación con problemas',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        info: { type: 'object' },
        error: { type: 'object' },
        details: { type: 'object' }
      }
    }
  })
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Aquí puedes agregar más checks como:
      // () => this.db.pingCheck('database'),
      // () => this.http.pingCheck('external-api', 'https://api.external.com'),
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  @ApiOperation({ 
    summary: 'Readiness Check',
    description: 'Verifica si la aplicación está lista para recibir tráfico'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Aplicación lista para recibir tráfico'
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Aplicación no está lista'
  })
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      // Checks específicos para readiness
    ]);
  }

  @Get('liveness')
  @HealthCheck()
  @ApiOperation({ 
    summary: 'Liveness Check',
    description: 'Verifica si la aplicación está viva'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Aplicación está viva'
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Aplicación no está respondiendo'
  })
  liveness(): Promise<HealthCheckResult> {
    return this.health.check([
      // Checks básicos de liveness
    ]);
  }
}
