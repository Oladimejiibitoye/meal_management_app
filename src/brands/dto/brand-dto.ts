import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty} from 'class-validator'

export class BrandDto {
  @IsString()
  @IsNotEmpty({message: 'brand_name cannot be empty'})
  @ApiProperty()
  brand_name: string
}