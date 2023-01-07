import { Column, Relation, Table, relationTypes, columnTypes} from 'nestjs-objection'
import { AddonModel } from "./addon.model";
import { BaseModel } from "./base.model";
import { BrandModel } from "./brand.model";


@Table({ tableName: 'addons_categories'})
export class AddonCategoryModel extends BaseModel {
  @Column({ type: columnTypes.string})
  name: string;
  @Column({ type: columnTypes.uuid})
  brand_Id: string;
  @Relation({
    modelClass: BrandModel,
    relation: relationTypes.BelongsToOneRelation,
    join: {from: 'addons_categories.brand_Id', to: 'brands.id'}
  })
  brand: BrandModel;
  @Relation({
    modelClass: AddonModel,
    relation: relationTypes.HasManyRelation,
    join: {from: 'addons_categories.id', to: 'addons.addons_category_id'}
  })
  addons: AddonModel[]
}