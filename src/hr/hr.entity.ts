
import { UserEntity } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HrEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fullName: string;

    @Column()
    company: string;

    @Column()
    maxReservedStudents: number;

    @Column({
        default: null,
        type: 'json'
    })
    reservedStudents: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

}