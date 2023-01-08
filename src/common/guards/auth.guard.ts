import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
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

      return true
      } catch (error) {
        throw new BadRequestException( error.message);
      }
    }
}