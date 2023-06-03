import { Node } from 'src/common/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Post extends Node {
  @Column()
  label1: string;
  @Column()
  label2: string;
  @Column()
  label3: string;
  @Column()
  label4: string;
  @Column()
  label5: string;
  @Column()
  jobTitle: string;
  @Column()
  description: string;
}
