import { Report } from "src/reports/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isAdmin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];
}