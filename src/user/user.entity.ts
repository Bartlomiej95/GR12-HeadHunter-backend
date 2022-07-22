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

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: null
  })
  firstName: string | null;

  @Column({
    default: null
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

  @Column()
  role: Role;

  @OneToOne(type => HrEntity)
  @JoinColumn()
  hr: HrEntity;
}