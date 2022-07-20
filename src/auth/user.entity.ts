import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/types/user.type";

@Entity()
export class UsersEntity extends BaseEntity {

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
}