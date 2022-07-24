import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/auth/user.entity";
import { HrEntity } from "src/hr/hr.entity";
import { rating } from "src/types";
import { ExpectedContractType, ExpectedTypeWork } from "src/types/user/user.register.type";
import { UserStatus } from "src/types/user/user.status";
import {BonusProjectUrlEntity} from "./bonus-project-url.entity";
import {PortfolioUrlEntity} from "./portfolio-url.entity";
import {ProjectUrlEntity} from "./project-url.entity";

@Entity()
export class StudentEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'int',
        precision: 1,
    })
    courseCompletion: rating;

    @Column({
        type: 'int',
        precision: 1,
    })
    courseEngagment: rating;

    @Column({
        type: 'int',
        precision: 1,
    })
    projectDegree: rating;

    @Column({
        type: 'int',
        precision: 1,
    })
    teamProjectDegree: rating;

    @Column({
        default: null,
        type: 'int',
        precision: 11,
    })
    tel: number | null;

    @Column({
        default: null
    })
    firstName: string | null;

    @Column({
        default: null
    })
    lastName: string | null;

    @Column({
        default: null
    })
    githubUsername: string | null;

    @Column({
        default: null
    })
    bio: string | null;

    @Column({
        default: null
    })
    expectedContractType: ExpectedContractType | null;

    @Column({
        default: null
    })
    targetWorkCity: string | null;

    @Column({
        default: null
    })
    expectedTypeWork: ExpectedTypeWork | null;

    @Column({
        default: null
    })
    expectedSalary: string | null;

    @Column({
        default: null
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
        default: UserStatus.AVAILABLE
    })
    reservationStatus: UserStatus

    @ManyToOne(() => HrEntity, (hr) => hr.reservedStudents)
    hr: HrEntity | null;

    @OneToOne(() => UserEntity)
    @JoinColumn()
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