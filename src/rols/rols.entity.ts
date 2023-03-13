import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permissions.entity';

@Entity('ROLS')
export class Rols {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @ManyToMany(() => User, (user: User) => user.rols)
    users: User[];
    @ManyToMany(() => Permission, (permission: Permission) => permission.rols)
    @JoinTable({
        name: 'ROLS_PERMISSIONS',
        joinColumns: [
            { name: 'rolId' },
        ],
        inverseJoinColumns: [
            { name: 'permissionId' },
        ],
    })
    permission: Permission[];
}
