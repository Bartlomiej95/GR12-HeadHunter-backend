import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/types/user/user.type";
import { HrEntity } from "src/hr/hr.entity";
import { StudentEntity } from "src/student/student.entity";

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
    jwt: string | null

    @Column({
        default: false,
    })
    isActive: boolean

    @Column({
        default: null,
    })
    link: string | null;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @Column()
    role: Role

}