import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, synchronize, InjectConnection, Connection} from 'nestjs-objection';
import { UserModel } from 'src/database/models/user.model';
import 'dotenv/config'


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly jwtTokenService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      await synchronize(UserModel)
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if(!authHeader) {
        throw new BadRequestException( 'Not Authorized');
      }
      const token = authHeader.split(' ')[1];
      const decodedtoken = await this.jwtTokenService.verify(token, {
        secret: process.env.JWT_SECRET_KEY} )
      if(!decodedtoken) {
        throw new BadRequestException( 'Not Authorized', '401')
      }
      
      const user = await this.userModel.query().findById(decodedtoken.id)
      if(user.is_admin === false){
        throw new BadRequestException( 'Not Authorized, You need to be an admin', '401')
      }

      return true
      } catch (error) {
        throw new BadRequestException( error.message);
      }
    }
}