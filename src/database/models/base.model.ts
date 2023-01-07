import { Model, Column, columnTypes} from 'nestjs-objection'

export class BaseModel extends Model {
  @Column({type: columnTypes.uuid })
  id: string;
}