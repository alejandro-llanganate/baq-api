import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController, UsersController],
  providers: [AppService],
})
export class AppModule {}
