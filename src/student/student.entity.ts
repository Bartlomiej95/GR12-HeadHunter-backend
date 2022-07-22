
import { UserEntity } from "src/auth/user.entity";
import { ExpectedContractType, ExpectedTypeWork } from "src/types/user/user.register.type";
import { BaseEntity, Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    courseCompletion: number;

    @Column()
    courseEngagment: number;

    @Column()
    projectDegree: number;

    @Column()
    teamProjectDegree: number;

    @Column()
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

    @OneToOne(() => UserEntity)
    @JoinTable()
    user: UserEntity;

}