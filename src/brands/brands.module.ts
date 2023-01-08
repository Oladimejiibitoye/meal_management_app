import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ObjectionModule } from 'nestjs-objection';
import { BrandModel } from 'src/database/models/brand.model';
import { BrandsController } from './brands.controller';
import { UserModel } from 'src/database/models/user.model';
import { AddonCategoryModel } from 'src/database/models/addonCategory.model';
import { AddonModel } from 'src/database/models/addon.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ObjectionModule.forFeature([BrandModel, UserModel, AddonCategoryModel, AddonModel])],
  providers: [BrandsService, JwtService],
  controllers: [BrandsController]
})
export class BrandsModule {}
