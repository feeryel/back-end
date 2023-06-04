import { Role } from 'src/auth/role.enum';
import { Node } from 'src/common/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Node {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  birthday: Date;
  @Column({ nullable: true })
  profileimage: string;
  @Column({ nullable: true })
  bannerimage: string;
  @Column({ nullable: true })
  biography: string;
  @Column({
    enum: Role,
    type: 'enum',
    nullable: true,
    default: Role.User,
  })
  role: string[];
}
