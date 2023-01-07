import { Column, Relation, Table, relationTypes, columnTypes} from 'nestjs-objection'
import { AddonModel } from "./addon.model";
import { AddonCategoryModel } from "./addonCategory.model";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";

@Table({ tableName: 'brands'})
export class BrandModel extends BaseModel {
  @Column({ type: columnTypes.string})
  brand_name: string;
  @Column({ type: columnTypes.uuid})
  user_Id: string;
  @Relation({
    modelClass: UserModel,
    relation: relationTypes.BelongsToOneRelation,
    join: { from: 'brands.user_Id', to: 'users.id'}
  })
  user: UserModel;
  @Relation({
    modelClass: AddonModel,
    relation: relationTypes.HasManyRelation,
    join: { from: 'brands.id', to: 'addons.brand_Id'}
  })
  addons: AddonModel[];
  @Relation({
    modelClass: AddonCategoryModel,
    relation: relationTypes.HasManyRelation,
    join: {from: 'brands.id', to: 'addons_categories.brand_Id' }
  })
  addons_categories: AddonCategoryModel[]

}

