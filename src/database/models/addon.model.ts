import { Column, Relation, Table, relationTypes, columnTypes} from 'nestjs-objection'
import { AddonCategoryModel } from "./addonCategory.model";
import { BaseModel } from "./base.model";
import { BrandModel } from "./brand.model";

@Table({ tableName: 'addons'})
export class AddonModel extends BaseModel {
  @Column({ type: columnTypes.string})
  name: string;
  @Column({ type: columnTypes.string})
  description: string;
  @Column({ type: columnTypes.decimal})
  price: number;
  @Column({type: columnTypes.string})
  category: string;
  @Column({ type: columnTypes.uuid})
  brand_Id: string;
  @Column({ type: columnTypes.uuid})
  addons_category_id: string;
  @Relation({
    modelClass: BrandModel,
    relation: relationTypes.BelongsToOneRelation,
    join: { from: 'addons.brand_Id', to: 'brands.id'}
  })
  brand: BrandModel;
  @Relation({
    modelClass: AddonCategoryModel,
    relation: relationTypes.BelongsToOneRelation,
    join: { from: 'addons.addons_category_id', to: 'addons_categories.id'}
  })
  addons_category: AddonCategoryModel

}