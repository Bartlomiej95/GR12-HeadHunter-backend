
import { UserEntity } from "src/auth/user.entity";
import { StudentEntity } from "src/student/student.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HrEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    company: string;

    @Column()
    maxReservedStudents: number;

    @OneToMany(() => StudentEntity, (student) => student.hr)
    reservedStudents: StudentEntity[];

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

}