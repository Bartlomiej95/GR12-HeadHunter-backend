
import { UserEntity } from "src/auth/user.entity";
import { HrEntity } from "src/hr/hr.entity";
import { rating } from "src/types";
import { ExpectedContractType, ExpectedTypeWork } from "src/types/user/user.register.type";
import { UserStatus } from "src/types/user/user.status";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
        type: 'longtext'
    })
    bonusProjectUrls: string;

    @Column({
        default: null
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
        default: null,
        type: 'json'
    })
    portfolioUrls: string | null;

    @Column({
        type: 'json',
        default: null
    })
    projectUrls: string | null;

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
        default: null
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

}