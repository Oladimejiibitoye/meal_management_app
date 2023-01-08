import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel, synchronize, InjectConnection, Connection} from 'nestjs-objection';
import { UserModel } from 'src/database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) 
    private readonly userModel: typeof UserModel,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly jwtTokenService: JwtService
    
  ){}

  async signup(user: CreateUserDto) {
    try {
      await synchronize(UserModel);
    //check if user with the name exist
    const existingUser = await this.userModel.query().where({ name: user.name});
    if(existingUser.length > 0){
      throw new BadRequestException('This name already exists')
    }
    //create new user if not exist
    const newUser = this.userModel.query().insert({id: uuidv4(), name: user.name, is_admin: true})
    return newUser;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async signin(signinDto: CreateUserDto){
    try {
      await synchronize(UserModel);
      //Find and check if user exist
      const user = await this.userModel.query().where({ name: signinDto.name})
      // return console.log(user)
      if(user.length === 0){
        throw new NotFoundException('User Not Found, Invalid Credentials')
      }
      //generate access token 
      const token = await this.jwtTokenService.sign({id: user[0].id}, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: Number(process.env.JWT_EXPIRATION)
      });
      return { user, token }
    } catch (error){
      throw new ForbiddenException( error.message)
    }

  }
}
