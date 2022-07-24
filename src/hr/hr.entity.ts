import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/auth/user.entity";
import { StudentEntity } from "src/student/student.entity";

@Entity()
export class HrEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    // @Column()
    // fullName: string;

    @Column()
    company: string;

    @Column({
        default: 1,
        type: 'int',
        precision: 3,
    })
    maxReservedStudents: number;

    @OneToMany(() => StudentEntity, (student) => student.hr)
    reservedStudents: StudentEntity[];

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

}