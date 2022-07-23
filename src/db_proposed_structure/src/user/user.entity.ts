import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { Role } from '../types';
import { HrEntity } from '../hr/hr.entity';
import { StudentEntity } from '../student/student.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: null,
    length: 50,
  })
  firstName: string | null;

  @Column({
    default: null,
    length: 50,
  })
  lastName: string | null;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column()
  iv: string;

  @Column({
    default: null,
  })
  jwt: string | null;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    default: null,
  })
  link: string | null;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    length: 10
  })
  role: Role;

  @OneToOne(type => HrEntity)
  @JoinColumn()
  hr: HrEntity;

  @OneToOne(type => StudentEntity)
  @JoinColumn()
  student: StudentEntity;
}