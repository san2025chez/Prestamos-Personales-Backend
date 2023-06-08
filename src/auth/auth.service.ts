import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
) { }

  private readonly logger = new Logger(AuthService.name);

  createToken(user: User) {
    const expiresIn = 3600;

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,


        profilePic: user.profilePic,
        lastAcces: user.lastAccess
      },
      'pepito',
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<any> {
    return await this.usersService.getUserValidateToken(payload.id);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const resp = await this.usersService.findByEmail(email);
    if (resp.user && resp.user.comparePassword(password)) {
      this.logger.log('password check success');
      // tslint:disable-next-line: no-shadowed-variable
      const { password, ...result } = resp.user;
      return result;
    }
    return null;
  }

  async findUserByMail(email: string): Promise<any> {
    return await this.usersService.findByEmail(email);
  }

  async validateNickEmail(nickEmail: string): Promise<any> {
    try {
      let status: RegistrationStatus = {
        success: true,
        message: 'nick or email is disposition',
      };
      const user = await this.usersService.findByEmail(nickEmail);
      if (user) {
        status = { success: false, message: 'El nickname or email already exist' };
      }
      return status;
    } catch (error) {
      console.log('Error', error);
    }
  }

  async login(login: LoginUserDto) {
    const resp = await this.usersService.login(login);
    console.log("resp de login:", resp);

    return resp;
  }



}
