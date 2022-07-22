import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from 'ormConfig';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterConfiguration } from 'config';
import { UserModule } from './user/user.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig as TypeOrmModule),
    ThrottlerModule.forRoot(RateLimiterConfiguration),
    UserModule,
    HrModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
