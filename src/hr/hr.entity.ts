import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class HrEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // fullName: string;  //moved into UserEntity as firstName and lastName

  @Column()
  company: string;

  @Column()
  maxReservedStudents: number;

  @OneToOne(type => UserEntity)
  user: UserEntity;
}