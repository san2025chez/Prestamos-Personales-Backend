import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, AfterLoad, ManyToOne } from "typeorm";

@Entity({ name: 'PRESTAMO' })
export class Prestamo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: Date, default: new Date, nullable: true })
    date: Date;

    @Column({ type: "float8", nullable: true })
     monto: number;
     @Column({ type: "float8", nullable: true })
     interes: number;
     @Column({ type: "float8", nullable: true })
     montoTotal: number;
     @Column('varchar', { length: 500, nullable: true })
     prenda: string;
     @Column('varchar', { length: 500, nullable: true })
     origen: string;
     @Column('varchar', { length: 500, nullable: true })
     descripcion: string;

     @Column('varchar', { length: 500, nullable: true })
     userficticio: string;
     @Column('varchar', { length: 500, nullable: true })
     lastNameficticio: string;
    @ManyToOne(type => User, (user: User) => user.prestamo)
    @JoinColumn()
    user: User;
    /*   customer: Customer; */


    @Column({ default: new Date() })
    createAt: Date;

}