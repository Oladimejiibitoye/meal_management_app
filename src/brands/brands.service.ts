import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel, synchronize, InjectConnection, Connection} from 'nestjs-objection';
import { UserModel } from 'src/database/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { BrandDto } from './dto/brand-dto';


@Injectable()
export class BrandsService {}
