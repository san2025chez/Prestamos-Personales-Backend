import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RegistrationStatus } from './interface/reponseStatus.interface';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ClienteDto } from './dto/cliente.dto';
import { UpdateUserDto } from './dto/updateUser.dto';



@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo)
  }

  public getAllUsers = async (): Promise<any[]> => {
    return await this.repo.find({ relations: ['rols'] });
  }


  public async getUsuarioById(id: string): Promise<any> {
    console.log('ido user service: ', id);
    let usuario = await this.repo.findOne(id, { relations: ['rols'] });
    console.log('comerce find: ', usuario);

    return usuario;
  }

  public getUserValidateToken = async (id: string): Promise<any> => {
    return await this.repo.findOne(id, { relations: ['rols'] });
  }

  public async findByEmail(userEmail: string): Promise<RegistrationStatus> {
    const status: RegistrationStatus = {
      success: false,
      message: 'user not found',
      user: null,
    };
    try {

      const user = await this.repo.findOne({ email: userEmail });
      if (user) {
        // tslint:disable-next-line: no-shadowed-variable
        const status: RegistrationStatus = {
          success: true,
          message: 'user finded',
          user,
        };
        return status;
      }
      return status;

    } catch (error) {
      console.log('error en buscar por email: ', error);

    }

  }

  public async findByNumCel(nroCel: string): Promise<RegistrationStatus> {
    const status: RegistrationStatus = {
      success: false,
      message: 'user not found',
      user: null,
    };
    try {

      const user = await this.repo.findOne({ phone: nroCel });
      console.log('user?: ', user);

      if (user) {
        // tslint:disable-next-line: no-shadowed-variable
        const status: RegistrationStatus = {
          success: true,
          message: 'user finded',
          user,
        };
        return status;
      }
      return status;

    } catch (error) {
      console.log('error en buscar por nro: ', error);

    }

  }


  public async login(login: any): Promise<any> {
    console.log("mi user es ", login);

    try {
      const user = await this.repo.findOne({ where: { email: login.email }, });
      

      if (user) {
        const pass = await user.comparePassword(login.password);

        if (pass) {

          return { success: true, user: user };
        } else {
          return { success: pass, user: null };
        }
      }

      return { success: false, user: null };

    } catch (error) {
      console.log('pass o mail incorrectos');

    }
  }

  public async findByNickName(nickName: string): Promise<User> {
    return await this.repo.findOne({ nickName });
  }

  public async findByEmailForValidate(email: string): Promise<User> {
    return await this.repo.findOne({ email });
  }

  public async findById(id: string): Promise<RegistrationStatus> {
    console.log('id a buscar: ', id);

    const user = await this.repo.findOne(id);
    console.log('user encontrado: ', user);

    const status: RegistrationStatus = {
      success: true,
      message: 'user finded',
      user,
    };
    return status;

  }

  public async register(userDto: UserDto): Promise<UserDto> {

    const { email } = userDto;
    let user = await this.repo.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      userDto.rols = [];

      user = this.repo.create(userDto);
      console.log(user.rols);
      return await this.repo.save(user);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  //---------------------------
  public async registerCliente(userDto: ClienteDto): Promise<ClienteDto> {

    console.log("entro a registrar", userDto);

    try {
      userDto.rols = [];
     let  user = this.repo.create(userDto);
      console.log("el USER CREADO ES ",user);

      //user.rols.push();
      user.password="123"

      return await this.repo.save(user);
    } catch (error) {
      console.log('error: ', error);
    }
  }


  
  public async updateUser2(userDto: UpdateUserDto) {

    return await this.repo.save(userDto);
  }



  public async updateUser(userDto: UserDto, rolDto: any) {
    
    const user = await this.repo.findOne({ where: { id: userDto.id}, relations: ['rols'] });
    console.log("comprobando los tipos de roles");

    console.log(user.rols);
    console.log(rolDto);
    if (user.rols.find(role => (role.name === "customer"))) {

      user.isCustomerAndSeller = !!userDto.isCustomerAndSeller;
      console.log(user.isCustomerAndSeller);

    }
    user.rols.push(rolDto);
    return this.repo.save(user);
  }


  //-----------------------------------------
  public async updateCliente(userDto: ClienteDto, rolDto: any) {
    const user = await this.repo.findOne({ where: { id: userDto.id}, relations: ['rols'] });
    console.log(user.rols);
    console.log(rolDto);
    if (user.rols.find(role => (role.name === "customer"))) {

      user.isCustomerAndSeller = !!userDto.isCustomerAndSeller;
      console.log(user.isCustomerAndSeller);

    }
    user.rols.push(rolDto);
    return this.repo.save(user);
  }


  public async updatePassword(credential: CredentialsDto) {

    let user;
    if (credential.email) {
      user = await this.repo.findOne({ where: { email: credential.email } });
    } else {
      user = await this.repo.findOne({ where: { phone: credential.nroCel } });
    }
    user.password = await bcrypt.hash(credential.pass, 10);
    await this.repo.save(user);
  }

  public async updateToken(token: string, idUser: string) {
  
    let user = await this.repo.findOne(idUser);
    console.log("user en service", user);

    user.firebaseRegistrationToken = token;
    console.log(user);

    return await this.repo.save(user);

  }

  public async deleteUser(id: string) {
    await this.repo.delete(id);
  }
  

  public async changePass(user: User, password) {
    user.password = await bcrypt.hash(password, 10);
    return this.repo.save(user);
  }


  public async comparePassword(password1: string, password2: string): Promise<boolean> {
    return password1 === password2
  }

  public async saveProduct(productDto: UserDto): Promise<any> {
    return await this.repo.save(productDto);
  }

  public async getReferrers(nickName: string): Promise<any> {
    const referrers = this.repo.find({ where: { nickReferrer: nickName } });
    return referrers;
  }

}
