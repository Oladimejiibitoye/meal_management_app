import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ObjectionModule, Model } from 'nestjs-objection';
import { UserModel } from 'src/database/models/user.model';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports:[
    ObjectionModule.forFeature([UserModel]),
    JwtModule.register({
      publicKey: 'PUBLIC_KEY',
      privateKey: 'PRIVATE_KEY'
    })
  ],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
