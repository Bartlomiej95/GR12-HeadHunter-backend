import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HrEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // fullName: string;  //przeniesione do UserEntity jako firstName i lastName

  @Column()
  company: string;

  @Column()
  maxReservedStudents: number;
}