import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty, MaxLength, IsNumber, IsEmpty} from 'class-validator'

export class AddonDto {
  @IsString()
  @IsNotEmpty({message: 'brand_name cannot be empty'})
  @MaxLength(255, {message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value '})
  @ApiProperty()
  name: string

  @IsString()
  @MaxLength(1000, {message: 'description is too long. Maximal length is $constraint1 characters, but actual is $value '})
  @ApiProperty()
  description: string

  @IsNumber()
  @IsNotEmpty({message: 'price cannot be empty'})
  @ApiProperty()
  price: number

  @IsString()
  @ApiProperty()
  category: string
}