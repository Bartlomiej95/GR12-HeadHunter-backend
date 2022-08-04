import { UserEntity } from 'src/auth/user.entity';
import { HrMsgEntity } from 'src/hr/hr-msg.entity';
import { HrEntity } from 'src/hr/hr.entity';
import { rating } from 'src/types';
import {
  ExpectedContractType,
  ExpectedTypeWork,
} from 'src/types/user/user.register.type';
import { UserStatus } from 'src/types/user/user.status';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseCompletion: rating;

  @Column()
  courseEngagment: rating;

  @Column()
  projectDegree: rating;

  @Column()
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
    default: null,
  })
  tel: string | null;

  @Column({
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
    default: null,
  })
  expectedContractType: ExpectedContractType | null;

  @Column({
    default: null,
  })
  targetWorkCity: string | null;

  @Column({
    default: null,
  })
  expectedTypeWork: ExpectedTypeWork | null;

  @Column({
    default: null,
  })
  expectedSalary: string | null;

  @Column({
    default: null,
  })
  canTakeApprenticeship: boolean | null;

  @Column({
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

  @Column({
    default: UserStatus.AVAILABLE,
  })
  reservationStatus: UserStatus;

  @Column({
    type: 'date',
    default: null,
  })
  reservationEnd: Date | null;

  @ManyToOne(() => HrEntity, (hr) => hr.reservedStudents)
  hr: HrEntity | null;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(
      type => HrMsgEntity,
  )
  hrMsg: HrMsgEntity;

  static findByHrId(hrId: string) {
    return this.createQueryBuilder('student')
      .where('student.hr = :hrId', { hrId })
      .getMany();
  }
}
