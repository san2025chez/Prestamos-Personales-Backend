import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Transform } from 'class-transformer';
import moment = require('moment');

@Entity('CODE')
export class Code {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: true})
    email: string;
    @Column({nullable: true})
    nroCel: string;
    @Column()
    code: string;
    @Column()
    validate: boolean;
    @Column()
    expiredAt: string;
    @Column()
    uso: boolean;
}
