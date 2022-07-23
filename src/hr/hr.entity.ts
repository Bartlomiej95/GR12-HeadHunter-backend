import {
  BaseEntity,
  Column,
  Entity, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { StudentEntity } from '../student/student.entity';

@Entity()
export class HrEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // fullName: string;  //moved into UserEntity as firstName and lastName

  @Column()
  company: string;

  @Column({
    default: 1,
    type: 'int',
    precision: 3,
  })
  maxReservedStudents: number;

  @OneToOne(type => UserEntity)
  user: UserEntity;

  @OneToMany(
    type => StudentEntity,
    entity => entity.checkedByHr,
  )
  checkedStudents: StudentEntity[];
}