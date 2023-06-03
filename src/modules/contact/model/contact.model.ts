import { Node } from 'src/common/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Contact extends Node {
  @Column({ nullable: true })
  Name: string;
  @Column()
  email: string;
  @Column()
  organisation: string;
  @Column()
  subject: string;
  @Column()
  message: string;
}
