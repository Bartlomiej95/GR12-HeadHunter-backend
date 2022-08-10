import { UserEntity } from 'src/auth/user.entity';
import { HrMsgEntity } from 'src/hr/hr-msg.entity';
import { rating } from 'src/types';
import {
  ExpectedContractType,
  ExpectedTypeWork,
} from 'src/types/user/user.register.type';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentReservationEntity } from './reservation.entity';

@Entity()
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'tinyint',
  })
  courseCompletion: rating;

  @Column({
    type: 'tinyint',
  })
  courseEngagment: rating;

  @Column({
    type: 'tinyint',
  })
  projectDegree: rating;

  @Column({
    type: 'tinyint',
  })
  teamProjectDegree: rating;

  @Column({
    type: 'longtext',
  })
  bonusProjectUrls: string;

  @Column({
    default: false,
  })
  areDataPatched: boolean;

  @Column({
    type: 'varchar',
    length: 15,
    default: null,
  })
  tel: string | null;

  @Column({
    type: 'varchar',
    length: 39,
    default: null,
  })
  githubUsername: string | null;

  @Column({
    default: null,
    type: 'longtext',
  })
  portfolioUrls: string | null;

  @Column({
    type: 'longtext',
    default: null,
  })
  projectUrls: string | null;

  @Column({
    default: null,
  })
  bio: string | null;

  @Column({
    type: 'enum',
    enum: ExpectedContractType,
    default: ExpectedContractType.IRRELEVANT,
  })
  expectedContractType: ExpectedContractType | null;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  targetWorkCity: string | null;

  @Column({
    type: 'enum',
    enum: ExpectedTypeWork,
    default: ExpectedTypeWork.IRRELEVANT,
  })
  expectedTypeWork: ExpectedTypeWork | null;

  @Column({
    type: 'varchar',
    length: 8,
    default: null,
  })
  expectedSalary: string | null;

  @Column({
    default: null,
  })
  canTakeApprenticeship: boolean | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  monthsOfCommercialExp: number | null;

  @Column({
    default: null,
    type: 'longtext',
  })
  education: string | null;

  @Column({
    default: null,
    type: 'longtext',
  })
  workExperience: string | null;

  @Column({
    default: null,
    type: 'longtext',
  })
  courses: string | null;

  @OneToMany(() => StudentReservationEntity, (student) => student.idStudent)
  StudentReservation: StudentReservationEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => HrMsgEntity)
  hrMsg: HrMsgEntity;

  static findByHrId(hrId: string) {
    return this.createQueryBuilder('student')
      .where('student.hr = :hrId', { hrId })
      .getMany();
  }
}
