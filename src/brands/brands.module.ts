import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ObjectionModule } from 'nestjs-objection';
import { BrandModel } from 'src/database/models/brand.model';

@Module({
  imports: [ObjectionModule.forFeature([BrandModel])],
  providers: [BrandsService]
})
export class BrandsModule {}
