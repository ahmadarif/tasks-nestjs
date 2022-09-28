import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'created_date' })
    createdDate: Date;

    @Column({ name: 'modified_date' })
    modifiedDate: Date;
}