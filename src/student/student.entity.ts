import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpectedContractType, ExpectedTypeWork, StudentStatus } from '../types';
import { UserEntity } from '../user/user.entity';
import { HrEntity } from '../hr/hr.entity';
import { BonusProjectUrlEntity } from './bonus-project-url.entity';
import { PortfolioUrlEntity } from './portfolio-url.entity';
import { ProjectUrlEntity } from './project-url.entity';

@Entity()
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    precision: 1,
  })
  courseCompletion: number;

  @Column({
    type: 'int',
    precision: 1,
  })
  courseEngagment: number;

  @Column({
    type: 'int',
    precision: 1,
  })
  projectDegree: number;

  @Column({
    type: 'int',
    precision: 1,
  })
  teamProjectDegree: number;

  // //move to end of class - relation 1-oo
  // @Column()
  // bonusProjectUrls: string;   //here should be array[]
  //                             //project from stage 9 (bonus stage)

  @Column({
    default: null,
    type: 'int',
    precision: 11,
  })
  tel: number | null;

  // //moved into UserEntity
  // @Column({
  //   default: null
  // })
  // firstName: string | null;
  //
  // @Column({
  //   default: null
  // })
  // lastName: string | null;

  @Column({
    default: null
  })
  githubUsername: string | null;

  // //move to end of class - relation 1-oo
  // @Column({
  //   default: null,
  //   type: 'json'
  // })
  // portfolioUrls: string | null;   //here should be array[], can be [empty]

  // //move to end of class - relation 1-oo
  // @Column({
  //   type: 'json',
  //   default: null
  // })
  // projectUrls: string | null;     //here should be array[]
  //                                 //project from stage 8 (to pass into stage 9)

  @Column({
    default: null,
    length: 5000,
  })
  bio: string | null;

  @Column({
    default: null
  })
  expectedTypeWork: ExpectedTypeWork | null;

  @Column({
    default: null
  })
  targetWorkCity: string | null;

  @Column({
    default: null
  })
  expectedContractType: ExpectedContractType | null;

  @Column({
    default: null,
    length: 7,
  })
  expectedSalary: string | null;

  @Column({
    default: null,
  })
  canTakeApprenticeship: boolean | null;

  @Column({
    default: null,
    type: 'int',
    precision: 3
  })
  monthsOfCommercialExp: number | null;

  @Column({
    default: null,
    type: 'longtext'
  })
  education: string | null;

  @Column({
    default: null,
    type: 'longtext'
  })
  workExperience: string | null;

  @Column({
    default: null,
    type: 'longtext'
  })
  courses: string | null;

  @Column({
    default: null
  })
  status: StudentStatus | null;

  @OneToOne(type => UserEntity)
  user: UserEntity;

  @ManyToOne(
    type => HrEntity,
    entity => entity.checkedStudents,
  )
  checkedByHr: HrEntity;

  @OneToMany(
    type => BonusProjectUrlEntity,
    entity => entity.student,
  )
  bonusProjectUrls: BonusProjectUrlEntity[];

  @OneToMany(
    type => PortfolioUrlEntity,
    entity => entity.student,
  )
  portfolioUrls: PortfolioUrlEntity[];

  @OneToMany(
    type => ProjectUrlEntity,
    entity => entity.student,
  )
  projectUrls: ProjectUrlEntity[];
}