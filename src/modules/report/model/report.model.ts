import { Node } from 'src/common/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Report extends Node {
  @Column()
  id: string;
  @Column()
  typeBug: string;
  @Column()
  email: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column({ nullable: true, default: 'En cours' })
  status: string;
}
