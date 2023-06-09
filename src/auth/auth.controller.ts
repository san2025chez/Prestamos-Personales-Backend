import {
    Controller,
    UseGuards,
    HttpStatus,
    Request,
    Response,
    Post,
    Body,
    Get,
    Query,
    Param,
    Logger,
    Put,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from '../users/user.entity';
import {
    ApiTags,
    ApiResponse,
    ApiBody,
    ApiOperation,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { LoginUserDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
/* import { CustomerService } from '../customers/customer.service';
import { CustomerDto } from '../customers/dto/customer.dto';
import { SellerDto } from '../sellers/dto/seller.dto';
import { SellerService } from '../sellers/seller.service'; */
import { debuglog } from 'util';
import { RegistrationResponse } from './interfaces/registartionResponse.interface';
import { RolsService } from '../rols/rols.service';


import { CredentialsDto } from './dto/credentials.dto';
import * as moment from 'moment';
import { ParamRecoveryDto, NumberRecoveryDto } from './dto/param-recovery.dto';
import { ValidateResponseDto } from './dto/responseDto.dto';
import { ValidateMailDto } from './dto/param-validate-mail.dto';

import { validateNickEmailQueryDto } from './dto/validation.dto';
import { Certificate } from 'crypto';
import { UserFirebaseDto } from '../users/dto/user-firebase.dto';
import { ClienteDto } from 'src/users/dto/cliente.dto';
import { RegistrationCliente } from './interfaces/registrationCliente';



@Crud({
    model: {
        type: User,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController');
    private frontEndUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081/';
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly rolsService: RolsService,
   

    ) { }

    @Get('validate')
    @ApiOperation({ summary: 'End point para validar email o nick name', description: 'validate email' })

    @ApiOkResponse({ description: 'El usuario o mail existe.', type: [UserDto], status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "The logged user has no rights" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "Internal server error" })


    public async validateNickEmail(@Response() res, @Query() query: validateNickEmailQueryDto) {
        try {
            const result = await this.authService.validateNickEmail(query.email);
            if (!result.success) {
                return res.status(HttpStatus.OK).json(result);
            }
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.FORBIDDEN).json();
        }
    }


    @Post('register')
    @ApiOperation({ summary: 'Registra una cuenta' })
    @ApiCreatedResponse({ description: 'The Account has been successfully created.', type: ClienteDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "The logged user has no rights" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: ClienteDto })
    public async register(@Response() res, @Body() userDto: ClienteDto) {
        try {
               const rol = await this.rolsService.findRol({ name: 'customer' });
                console.log("INGRESO AL BBBBBACK",userDto);
                const user = await this.usersService.registerCliente(userDto);
                console.log("el user creado es",user);
                

                const users = await this.usersService.updateCliente(user, rol);
                const response: RegistrationCliente  = {
                    success: true,
                    message: 'user registered sucesfull',
                    user,

                };
                console.log(response);

                return res.status(HttpStatus.OK).json(response);
            
        } catch (err) {
            debuglog(err);
            const response: RegistrationResponse = { success: false, message: err, user: null };
            return res.status(HttpStatus.OK).json(response);
        }
    }

    /* -------------------------------------------*/
    @Post('registerAdmin')
    @ApiOperation({ summary: 'Registra una cuenta' })
    @ApiCreatedResponse({ description: 'The Account has been successfully created.', type: UserDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "The logged user has no rights" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: UserDto })
    public async registerAdmin(@Response() res, @Body() userDto: UserDto) {
        try {
            const resp = await this.usersService.findByEmail(userDto.email);
            if (resp.success) {
                const response: RegistrationResponse = {
                    success: false,
                    message: 'user already exist',
                    user: null,
                };
                return res.status(HttpStatus.OK).json(response);
            } else {
                const rol = await this.rolsService.findRol({ name: 'admin' });
                //userDto.rols = rol;
                const user = await this.usersService.register(userDto);


                const users = await this.usersService.updateUser(user, rol);
                const response: RegistrationResponse = {
                    success: true,
                    message: 'user registered sucesfull',
                    user,

                };
                console.log(response);

                return res.status(HttpStatus.OK).json(response);
            }
        } catch (err) {
            debuglog(err);
            const response: RegistrationResponse = { success: false, message: err, user: null };
            return res.status(HttpStatus.OK).json(response);
        }
    }
    /*-------------------------------------------- */
    @Put('/edit/user/:id')
    public async updateUser(@Response() res, @Param() param, @Body() userDto: UserFirebaseDto): Promise<any> {
        try {
            console.log("datos ingresados", userDto.firebaseRegistrationToken);
            console.log("id a buscar", param.id);


            let user2 = await this.usersService.findById(param.id);
            console.log("user encontrado", user2);

            const userUpdate = await this.usersService.updateToken(userDto.firebaseRegistrationToken, param.id);
            console.log("user con tocken", userUpdate);

            return res.status(HttpStatus.OK).json(userUpdate);


        } catch (error) {
            console.log('error al modifcar user: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el user', error });

        }



    }




    // @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Se loguea una cuenta' })
    @ApiCreatedResponse({ description: 'The Account has been successfully login.', type: LoginUserDto, status: 200 })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: LoginUserDto })
    public async login(@Response() res, @Body() login: LoginUserDto) {
        const resp = await this.authService.login(login);
        if (resp.success) {
            console.log("ana");
            console.log(resp.user);


            const token = this.authService.createToken(resp.user);
            return res.status(HttpStatus.OK).json(token);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'User o pass incorrect',
            });
        }
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Se loguea una cuenta con google', description: 'login account google' })
    @ApiResponse({ status: 200, description: 'Los datos han sido devueltos correctamente.' })

    @ApiResponse({ status: 400, description: "bad request" })
    @ApiResponse({ status: 403, description: "forbidden" })
    @ApiResponse({ status: 404, description: "Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async googleCallback(@Request() req, @Response() res) {
        const token = this.authService.createToken(req.user);
        res.redirect(this.frontEndUrl + 'verifytoken/' + token.accessToken);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    @ApiResponse({ status: 200, description: 'Los datos han sido devueltos correctamente.' })
    @ApiResponse({ status: 400, description: "bad request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async googleSignIn() {
        console.log('get google debe andar el guard');

    }

}
