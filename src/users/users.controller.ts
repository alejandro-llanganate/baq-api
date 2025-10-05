import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

interface User {
  id: number;
  name: string;
  email: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'María García', email: 'maria@example.com' },
  ];

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Retorna una lista de todos los usuarios registrados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', example: 'juan@example.com' }
        }
      }
    }
  })
  findAll(): User[] {
    return this.users;
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener usuario por ID',
    description: 'Retorna un usuario específico por su ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario',
    type: 'number',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Juan Pérez' },
        email: { type: 'string', example: 'juan@example.com' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado'
  })
  findOne(@Param('id') id: string): User | { message: string } {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) {
      return { message: 'Usuario no encontrado' };
    }
    return user;
  }

  @Post()
  @ApiOperation({ 
    summary: 'Crear nuevo usuario',
    description: 'Crea un nuevo usuario en el sistema'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Carlos López' },
        email: { type: 'string', example: 'carlos@example.com' }
      },
      required: ['name', 'email']
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 3 },
        name: { type: 'string', example: 'Carlos López' },
        email: { type: 'string', example: 'carlos@example.com' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos'
  })
  create(@Body() createUserDto: { name: string; email: string }): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(newUser);
    return newUser;
  }
}
