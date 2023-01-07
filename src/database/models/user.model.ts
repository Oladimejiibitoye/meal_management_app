import {Column, Table, columnTypes} from 'nestjs-objection'
import { BaseModel } from "./base.model";

@Table({ tableName: 'users'})
export class UserModel extends BaseModel {
  @Column({ type: columnTypes.string})
  name: string;
  @Column({ type: columnTypes.boolean})
  is_admin: boolean;
}

