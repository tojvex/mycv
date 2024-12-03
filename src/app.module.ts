import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { UsersService } from './users/users.service';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    ReportsModule,
    
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    },

  ],
})
export class AppModule {
  constructor(
    private configService: ConfigService
  ) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    }))
      .forRoutes('*');
  }
}
