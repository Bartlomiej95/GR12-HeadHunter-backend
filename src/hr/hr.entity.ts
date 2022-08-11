import { UserEntity } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HrMsgEntity } from './hr-msg.entity';
import { StudentReservationEntity } from '../student/reservation.entity';

@Entity()
export class HrEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  company: string;

  @Column({
    type: 'tinyint',
  })
  maxReservedStudents: number;

  @OneToMany(() => StudentReservationEntity, (student) => student.idHr)
  StudentReservation: StudentReservationEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => HrMsgEntity, (entity) => entity.hr)
  hrMsg: HrMsgEntity;
}
