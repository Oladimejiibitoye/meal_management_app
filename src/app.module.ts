import 'dotenv/config'
import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AddonsController } from './addons/addons.controller';
import { AddonsModule } from './addons/addons.module';
import { BrandsController } from './brands/brands.controller';
import { BrandsModule } from './brands/brands.module';
import { AddonsCategoriesController } from './addons_categories/addons_categories.controller';
import { AddonsCategoriesModule } from './addons_categories/addons_categories.module';
import { ObjectionModule, Model } from 'nestjs-objection';
import { UserModel } from './database/models/user.model';
import { BrandModel } from './database/models/brand.model';
import { AddonCategoryModel } from './database/models/addonCategory.model';
import { AddonModel } from './database/models/addon.model';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [
    ObjectionModule.forRoot({
      Model,
      config: {
        client: 'pg',
        connection: {
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          port: Number(process.env.DATABASE_PORT)
        },
      }
    }),
    ObjectionModule.forFeature([
      UserModel,
      BrandModel,
      AddonCategoryModel,
      AddonModel
    ]),
    UsersModule,
    AddonsModule,
    BrandsModule,
    AddonsCategoriesModule
  ],
  controllers: [AppController, UsersController, AddonsController, BrandsController, AddonsCategoriesController],
  providers: [AppService, UsersService, JwtService],
})
export class AppModule {}
