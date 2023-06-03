import { Node } from 'src/common/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Report extends Node {
  @Column()
  typeBug: string;
  @Column()
  email: string;
  @Column()
  description: string;
  @Column()
  image: string;
}
