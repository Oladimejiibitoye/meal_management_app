import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    KnexModule.forRoot({
      config:{
        client: 'pg',
        connection: {
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          port: Number(process.env.DATABASE_PORT)
        },
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
