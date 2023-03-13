import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Rols } from '../rols/rols.entity';

@Entity('PERMISSIONS')
export class Permission {
   @PrimaryGeneratedColumn()
   id: string;
   @Column()
   name: string;
   @ManyToMany(() => Rols, (rols: Rols) => rols.permission)
   rols: Rols[];
}
