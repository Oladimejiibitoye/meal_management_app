import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty} from 'class-validator'

export class AddonCategoryDto {
  @IsString()
  @IsNotEmpty({message: 'brand_name cannot be empty'})
  @ApiProperty()
  name: string
}