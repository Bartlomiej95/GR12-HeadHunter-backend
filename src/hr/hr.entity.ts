import { Role } from "src/types";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HrEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({
        default: null
    })
    hash: string | null;

    @Column({
        default: null
    })
    salt: string | null;

    @Column({
        default: null
    })
    iv: string | null;

    @Column({
        default: null,
    })
    loggedIn: string | null

    @Column({
        default: false,
    })
    activated: boolean

    @Column({
        default: null,
    })
    link: string | null;

    @Column()
    role: Role

    @Column()
    fullName: string;

    @Column()
    company: string;

    @Column()
    maxReservedStudents: number

    //tu będzie relacja one to many wybranych na rozmowę kursantów
}