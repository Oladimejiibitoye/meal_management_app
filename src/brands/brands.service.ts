import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel, synchronize, InjectConnection, Connection} from 'nestjs-objection';
import { AddonCategoryModel } from 'src/database/models/addonCategory.model';
import { BrandModel } from 'src/database/models/brand.model';
import { UserModel } from 'src/database/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { BrandDto } from './dto/brand-dto';
import { AddonCategoryDto } from './dto/addons_categories-dto';
import { AddonDto } from './dto/addon-dto';
import { AddonModel } from 'src/database/models/addon.model';


@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(BrandModel)
    private readonly brandModel: typeof BrandModel,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    @InjectModel(AddonCategoryModel)
    private readonly addonCategoryModel: typeof AddonCategoryModel,
    @InjectModel(AddonModel)
    private readonly addonModel: typeof AddonModel,
    @InjectConnection()
    private readonly connection: Connection
  ){}

  async createbrand(userId: string, brand: BrandDto){
    try {
      await synchronize(UserModel);
      await synchronize(BrandModel);
      //check if user wit userId exist
      const existingUser = await this.userModel.query().findById(userId);
      if(!existingUser){
        throw new NotFoundException('User not found')
      }
      //check if user already created a brand
      const existingUserWithBrand = await this.brandModel.query().where({ user_id: existingUser.id})
      if(existingUserWithBrand.length > 0){
        throw new BadRequestException('User already created a brand')
      }
      //create a brand for user if he hasnot created one
      const newBrand = this.brandModel.query().insert({id: uuidv4(), brand_name: brand.brand_name, user_id: existingUser.id })
      return newBrand;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async createcategory(brandId: string, addonCategory: AddonCategoryDto){
    try {
      await synchronize(BrandModel)
      await synchronize(AddonCategoryModel)
      //check if brand with Id exist
      const existingBrand = await this.brandModel.query().findById(brandId)
      if(!existingBrand){
        throw new NotFoundException('Brand Not Found')
      }
      //check if a category name has been created by a brand
      const categoryName = await this.addonCategoryModel.query().where({brand_id: brandId, name: addonCategory.name})
      // return console.log(categoryName)
      if(categoryName[0]){
        throw new BadRequestException('Brand already created this category')
      }
      //create new category
      const newCategory = await this.addonCategoryModel.query().insert({id: uuidv4(), name: addonCategory.name, brand_id: existingBrand.id})
      return newCategory;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async createaddon(brandId: string, addon: AddonDto){
    try {
      await synchronize(BrandModel)
      await synchronize(AddonModel)
      await synchronize(AddonCategoryModel)
      //check if brand with Id exist
      const existingBrand = await this.brandModel.query().findById(brandId)
      if(!existingBrand){
        throw new NotFoundException('Brand Not Found')
      }
      //check if the category name has been created by the brand
      if(addon.category){
        const categoryName = await this.addonCategoryModel.query().where({brand_id: brandId, name: addon.category})
        if(categoryName.length === 0){
          throw new BadRequestException('Category does not exist, please create one')
      }
      //create new addon
      const newAddonWithCategory = await this.addonModel.query().insert({
        id: uuidv4(),
        name: addon.name,
        description: addon.description,
        price: addon.price,
        category: addon.category,
        brand_id: existingBrand.id,
        addons_category_id: categoryName[0].id
      })
      return newAddonWithCategory
      }
      //create new addon without category
      const newAddonWithoutCategory = await this.addonModel.query().insert({
        id: uuidv4(),
        name: addon.name,
        description: addon.description,
        price: addon.price,
        brand_id: existingBrand.id
      })
      return newAddonWithoutCategory;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async getaddons(brandId: string){
    try{
      await synchronize(AddonModel)
      //get all addons associated with this brand id
      const addons = await this.addonModel.query().where({brand_id: brandId})
      return addons
    } catch (error){
      throw new ForbiddenException(error.message)
    }
  }

  async getaddon(brandId: string, addonId: string){
    try{
      await synchronize(AddonModel)
      //get all addons associated with this brand id
      const addon = await this.addonModel.query().where({brand_id: brandId, id: addonId})
      return addon[0]
    } catch (error){
      throw new ForbiddenException(error.message)
    }
  }

  async updateaddon(brandId: string, addonId: string, updatedAddonDto: AddonDto){
    try {
      await synchronize(AddonModel)
      await synchronize(AddonCategoryModel)
      //check if addon with brandId and addonId exist
      const existingAddon = await this.getaddon(brandId, addonId)
      if(!existingAddon){
        throw new NotFoundException('addon does not exist')
      }
      //check if the category has been created
      if(updatedAddonDto.category){
        const categoryName = await this.addonCategoryModel.query().where({brand_id: brandId, name: updatedAddonDto.category})
        if(categoryName.length === 0){
          throw new BadRequestException('Category does not exist, please create one')
        }
        const updatedAddonWithCategory = await this.addonModel.query()
        .where({brand_id: brandId, id: addonId})
        .patch({...updatedAddonDto, addons_category_id: categoryName[0].id})
        .returning('*')
        return updatedAddonWithCategory
      }
      //update existing addon
      const updatedAddonWithoutCatgory = await this.addonModel.query()
        .where({brand_id: brandId, id: addonId})
        .patch(updatedAddonDto)
        .returning('*')
      return updatedAddonWithoutCatgory
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async deleteaddon(brandId: string, addonId: string){
    try {
      await synchronize(AddonModel)
      //check if addon with brandId and addonId exist
      const existingAddon = await this.getaddon(brandId, addonId)
      if(!existingAddon){
        throw new NotFoundException('addon does not exist')
      }
      //delete existing addon
      const deletedAddon = await this.addonModel.query()
        .where({brand_id: brandId, id: addonId})
        .delete()
        .returning('*')

      return { 
        message: 'addon deleted',
        deletedAddon
    }

    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
