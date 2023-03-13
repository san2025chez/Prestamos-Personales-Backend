import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IsOptional, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Rols } from '../rols/rols.entity';
import { Prestamo } from '../prestamo/prestamo.entity';


// const { CREATE, UPDATE } = CrudValidationGroups;
const enum tipoUsuario { customer = 'customer', seller = 'seller', admin = 'admin' }

@Entity('USERS')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 300, nullable: true })
  email: string;

  @Column('varchar', { length: 300 })
  password: string;

  @IsOptional(/* { groups: [CREATE] } */)
  @Column('varchar', { length: 300, nullable: true })
  firstName: string;

  @Column('varchar', { length: 300, nullable: true })
  lastName: string;

  @Column('varchar', { length: 300, nullable: true })
  nickReferrer: string;
  @Column('varchar', { length: 300, unique: true, nullable: true })
  nickName: string;


  @Column('varchar', { length: 300, nullable: true })
  phone: string;

  @Column('varchar', { length: 30, nullable: true })
  gender: string;

  @Column('varchar', { length: 300, nullable: true })
  dni: string;

  @Column('varchar', { length: 300, nullable: true })
  profilePic: string;

  @Column('varchar', { length: 10, nullable: true, default: false })
  isCustomerAndSeller: boolean;

  @Column('varchar', { length: 10, nullable: true, default: tipoUsuario.customer })
  lastAccess: tipoUsuario;

  @Column("text", { array: true, default: () => 'array [] :: text []' })
  favorite: string[];

  @Column('varchar', { length: 500, nullable: true })
  firebaseRegistrationToken: string;
  @Column('varchar', { length: 500, nullable: true })
  pais: string;
  @Column('varchar', { length: 500, nullable: true })
  provincia: string;
  @Column('varchar', { length: 500, nullable: true })
  localidad: string;
  @Column('varchar', { length: 500, nullable: true })
  latitud: string;
  @Column('varchar', { length: 500, nullable: true })
  longitud: string;
  @Column('varchar', { length: 500, nullable: true })
  calle: string;
  @Column('varchar', { length: 500, nullable: true })
  barrio: string;
  @Column('varchar', { length: 500, nullable: true })
  numero: string;
  /* @OneToOne(() => Customer, (customer: Customer) => customer.user)
  customer: Customer; */

  /*  @OneToOne(() => Seller, (seller: Seller) => seller.user)
   seller: Seller; */
   
  @ManyToMany(() => Rols, (rol: Rols) => rol.users)
  @JoinTable({
    name: 'USERS_ROLS',
    joinColumns: [
      { name: 'userId' },
    ],
    inverseJoinColumns: [
      { name: 'rolId' },
    ],
  })
  rols: Rols[];

 @OneToMany(type => Prestamo, (prestamo: Prestamo) => prestamo.user)
  prestamo: Prestamo;
 /* 
  @OneToMany(type => Commision, commision => commision.user)
  commisions: Commision[];
  user: any; */
  /*  customer: any;
   seller: any; */


  @BeforeInsert()
  // @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    // this.nickName= await bcrypt.hash(this.nickName,10)
  }

  async comparePassword(attempt: string): Promise<any> {
    return await bcrypt.compare(attempt, this.password);
  }
  async compareNickname(nick: string) {
        if (nick === this.nickName) {
          return true;
        }
     }

  toResponseObject(showToken: boolean = true): UserDto {
    const { email, password, firstName, lastName, dni, gender,barrio, phone, nickName,isCustomerAndSeller, profilePic, rols, nickReferrer, calle, numero, latitud, longitud, localidad, pais, provincia, firebaseRegistrationToken
    } = this;
    const responseObject: UserDto = {
      email,
      password,
      firstName,
      lastName,
      dni,
      firebaseRegistrationToken,
      gender,
      nickReferrer,
      phone,
      nickName,
      profilePic,
      calle,
      barrio,
      numero,
      localidad,
      provincia,
      pais,
      latitud,
      longitud,
      isCustomerAndSeller,
      rols,
    };

    return responseObject;
  }
}
