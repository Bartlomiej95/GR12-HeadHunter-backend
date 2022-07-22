import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../types';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}