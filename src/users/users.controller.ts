import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags} from '@nestjs/swagger'

@ApiTags('Auth-Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

  @Post('/signup')
  @ApiOperation({ description: 'Sign up a user'})
  async signUpUser(@Body() body: CreateUserDto) {
    const response = await this.userService.signup(body);
    return response
  };

  @Post('/signin')
  @ApiOperation({ description: 'Sign in a user'})
  async signInUser( @Body() signinDto: CreateUserDto) {
    const response = await this.userService.signin(signinDto);
    return response
  }

}
