import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    role: string;

    @Column()
    efficiency: number;
}