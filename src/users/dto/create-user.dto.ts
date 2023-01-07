import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({message: 'name cannot be empty'})
  @ApiProperty()
  name: string
}
