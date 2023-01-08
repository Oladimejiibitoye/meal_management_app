import { Controller, Post, Body, Param, ParseUUIDPipe, Get, Patch, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandDto } from './dto/brand-dto';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiBasicAuth} from '@nestjs/swagger'
import { AddonCategoryDto } from './dto/addons_categories-dto';
import { AddonDto } from './dto/addon-dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';


@ApiTags('Brands')
@Controller('brands')
@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
export class BrandsController {
  constructor(
    private readonly brandService: BrandsService
  ){}

  @Post('/:userId/brand/create')
  @ApiOperation({ description: 'Create a new brand'})
  async createBrand(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() brand: BrandDto) {
      const response = await this.brandService.createbrand(userId, brand);
      return response
    }
  @Post('/:brandId/addon-categories')
  @ApiOperation({description: 'Create an addon category'})
  async createAddonCategory(
    @Param('brandId', new ParseUUIDPipe()) brandId: string,
    @Body() addonCategory: AddonCategoryDto) {
      const response = await this.brandService.createcategory(brandId, addonCategory)
      return response
    }
  @Post('/:brandId/addons')
  @ApiOperation({description: 'Create an addon for a brand '})
  async createAddon(
    @Param('brandId', new ParseUUIDPipe()) brandId: string,
    @Body() addon: AddonDto){
      const response =  await this.brandService.createaddon(brandId, addon)
      return response
    }

  @Get('/:brandId/addons')
  @ApiOperation({description: 'Get all created addons for a brand'})
  async getAddons(
    @Param('brandId', new ParseUUIDPipe()) brandId: string){
      const response = await this.brandService.getaddons(brandId)
      return response
    }

  @Get('/:brandId/addons/:addonId')
  @ApiOperation({description: 'Get single addon for a brand'})
  async getAddon(
    @Param('brandId', new ParseUUIDPipe()) brandId: string,
    @Param('addonId', new ParseUUIDPipe()) addonId: string){
      const response = await this.brandService.getaddon(brandId, addonId)
      return response
    }
  
  @Patch('/:brandId/addons/:addonId')
  @ApiOperation({description: 'Update an existing addon '})
  async updateAddon(
    @Param('brandId', new ParseUUIDPipe()) brandId: string,
    @Param('addonId', new ParseUUIDPipe()) addonId: string,
    @Body() updatedAddonDto: AddonDto){
      const response = await this.brandService.updateaddon(brandId, addonId, updatedAddonDto)
      return response
    }

  @Delete('/:brandId/addons/:addonId')
  @ApiOperation({description: 'Delete a single meal addon by its ID for the specified brand'})
  async deleteAddon(
    @Param('brandId', new ParseUUIDPipe()) brandId: string,
    @Param('addonId', new ParseUUIDPipe()) addonId: string){
      const response = await this.brandService.deleteaddon(brandId, addonId)
      return response
    }


}
