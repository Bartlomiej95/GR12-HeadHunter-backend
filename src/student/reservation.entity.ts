import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatus } from '../types';
import { StudentEntity } from './student.entity';
import { HrEntity } from '../hr/hr.entity';

@Entity()
export class StudentReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StudentEntity, (student) => student.id, {
    onDelete: 'CASCADE',
  })
  idStudent: StudentEntity | string;

  @ManyToOne(() => HrEntity, (hr) => hr.id, {
    onDelete: 'CASCADE',
  })
  idHr: HrEntity | string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.AVAILABLE,
  })
  reservationStatus: UserStatus;

  @Column({
    type: 'date',
    default: null,
  })
  reservationEnd: Date | null;
}
