import { Module } from '@nestjs/common';
import { AddonsCategoriesService } from './addons_categories.service';
import { ObjectionModule } from 'nestjs-objection';
import { AddonCategoryModel } from 'src/database/models/addonCategory.model';

@Module({
  imports:[ObjectionModule.forFeature([AddonCategoryModel])],
  providers: [AddonsCategoriesService]
})
export class AddonsCategoriesModule {}
