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
import { CodeDto } from '../code/dto/code.dto';
import { CodeService } from '../code/code.service';
import { MailerOptions } from '../mailer/mailer.interface';
import config from '../mailer/config';
import { CredentialsDto } from './dto/credentials.dto';
import * as moment from 'moment';
import { ParamRecoveryDto, NumberRecoveryDto } from './dto/param-recovery.dto';
import { ValidateDto } from '../code/dto/validateDto.dto';
import { ValidateResponseDto } from './dto/responseDto.dto';
import { ValidateMailDto } from './dto/param-validate-mail.dto';

import { validateNickEmailQueryDto } from './dto/validation.dto';
import { Certificate } from 'crypto';
import { UserFirebaseDto } from '../users/dto/user-firebase.dto';
import { ClienteDto } from 'src/users/dto/cliente.dto';
import { RegistrationCliente } from './interfaces/registrationCliente';


const accountSid = 'AC8a6ee19f6694c37a1e379a8f7b7c661c';
const authToken = 'b5cc5a6563277252815d8743c65b9c6d';
const client = require('twilio')(accountSid, authToken);

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
    private frontEndUrl = process.env.NODE_ENV === 'production' ? 'https://comprartir-staging.tk/' : 'http://localhost:8081/';
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        /*   private readonly customerService: CustomerService,
          private readonly sellerService: SellerService,*/
        private readonly rolsService: RolsService,
        private readonly codeService: CodeService
        // private readonly commerceService: CommerceService

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


    /*     @Post('register/customer')
        @ApiOperation({ summary: 'Register account the customer', description: 'Register account the customer' })
        @ApiCreatedResponse({ description: 'The Account has been successfully created.', type: CustomerDto, status: 200 })
    
        @ApiResponse({ status: 400, description: "Bad Request" })
        @ApiResponse({ status: 403, description: "The logged user has no rights" })
        @ApiResponse({ status: 404, description: "'The resource was not found'" })
        @ApiResponse({ status: 409, description: "Conflict" })
        @ApiResponse({ status: 500, description: "Internal server error" })
    
        @ApiBody({ type: CustomerDto })
    
        public async registerCustomer(@Response() res, @Body() customerDto: CustomerDto): Promise<LoginResponseDto> {
            let response: LoginResponseDto = {
                success: true,
                message: 'customer regitered',
            };
            try {
                const resp = await this.customerService.findUser(customerDto.userId);
                if (resp.success) {
                    // tslint:disable-next-line: no-shadowed-variable
                    const response: LoginResponseDto = {
                        success: true,
                        message: 'customer already exist',
                    };
                    return res.status(HttpStatus.OK).json(response);
                } else {
                    // tslint:disable-next-line: no-shadowed-variable
                    const resp = await this.usersService.findById(customerDto.userId);
                    const rol = await this.rolsService.findRol({ name: 'customer' });
                    await this.customerService.saveCustomer(resp.user);
                    await this.usersService.updateUser(resp.user, rol);
                }
            } catch (err) {
                debuglog(err);
                response = { success: false, message: err };
            }
            return res.status(HttpStatus.OK).json(response);
        }
    
        @Post('register/seller')
        @ApiOperation({ summary: 'Registra cuenta de Seller' })
    
        @ApiCreatedResponse({ description: 'The Account has been successfully created.', type: SellerDto, status: 200 })
        @ApiResponse({ status: 400, description: "Bad Request" })
        @ApiResponse({ status: 403, description: "The logged user has no rights" })
        @ApiResponse({ status: 404, description: "'The resource was not found'" })
        @ApiResponse({ status: 409, description: "Conflict" })
        @ApiResponse({ status: 500, description: "internal server error" })
    
        @ApiResponse({ description: 'Internal error server', status: 500 })
    
        @ApiBody({ type: SellerDto })
        public async registerSeller(@Response() res, @Body() sellerDto: SellerDto): Promise<LoginResponseDto> {
            let response: LoginResponseDto = {
                success: true,
                message: 'seller regitered',
            };
            try {
                const resp = await this.sellerService.findUser(sellerDto.userId);
                if (resp.success) { */
    // tslint:disable-next-line: no-shadowed-variable
    /*       const response: LoginResponseDto = {
              success: true,
              message: 'seller already exist',
          };
          return res.status(HttpStatus.OK).json(response);
      } else { */
    // tslint:disable-next-line: no-shadowed-variable
    /*    const resp = await this.usersService.findById(sellerDto.userId);
       const rol = await this.rolsService.findRol({ name: 'seller' });
       await this.sellerService.saveSeller(resp.user);
       await this.usersService.updateUser(resp.user, rol); */
    /* if (sellerDto.commerce) {
        await this.commerceService.saveCommerce(sellerDto.commerce)
    } */
    /*         }
        } catch (err) {
            debuglog(err);
            response = { success: false, message: err };
        }
        return res.status(HttpStatus.OK).json(response);
    } */

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

    @Get('recovery/:email')
    @ApiOperation({ summary: 'End point para enviar el email' })

    @ApiOkResponse({ description: 'the email was sent correctly', type: [ParamRecoveryDto], status: 200 })
    @ApiResponse({ status: 400, description: "bad request" })
    @ApiResponse({ status: 403, description: "forbidden" })
    @ApiResponse({ status: 404, description: "Email Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })

    public async validateMail(@Response() res, @Param() mail: ParamRecoveryDto) {
        this.logger.log(mail.email);
        const result = await this.usersService.findByEmail(mail.email);
        // const codigo = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
        let codigo = '';
        const ref = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 6; i++) {
            codigo += ref.charAt(Math.floor(Math.random() * ref.length));
        }
        const code: CodeDto = {
            email: mail.email,
            nroCel: null,
            code: codigo,
            validate: false,
            expiredAt: moment().add(30, 'm').format('YYYY-MM-DD HH:mm'),
            uso: false,
        };
        if (result.success) {
            try {
                const mailer: MailerOptions = {
                    to: mail.email,
                    from: config.USER,
                    subject: 'Comprartir codigo de recuperacion de contraseña',
                    text: 'Tu Codigo de recuperacion de Contraseña es: ' + codigo + 'y la fecha de expiracion de dicho codigo es: ' + code.expiredAt,
                    // tslint:disable-next-line: max-line-length
                    html: 'Tu Codigo de recuperacion de Contraseña es: ' + codigo + '. Y la fecha de expiracion de dicho codigo es: ' + code.expiredAt,

                };
                try {
                    const mailresp = await this.authService.sendMail(mailer);
                } catch (error) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ error, message: 'Ocurrio un error al enviar el mail' });
                }
                // tslint:disable-next-line: no-shadowed-variable
                const result = await this.codeService.saveCode(code);
                if (!result) {
                    return res.status(HttpStatus.BAD_REQUEST).json(result);
                }
                return res.status(HttpStatus.OK).json('Se guardo el codigo correctamente');
            } catch (error) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontre el email' });
            }
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'user not exist', message: 'usario no existente' });
        }

    }
    @Post('validate-code')
    @ApiOperation({ summary: 'Validation the code the recovery the  password' })
    @ApiOkResponse({ description: 'The code has been checked successfully.', type: ValidateResponseDto, status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "ProhibidoForbidden" })
    @ApiResponse({ status: 404, description: "Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: ValidateDto })
    public async validateCode(@Response() res, @Body() validate: ValidateDto) {
        const resp = await this.codeService.validateMailandCodigo(validate);
        if (!resp.succeses) {
            res.status(HttpStatus.BAD_REQUEST).json({ ...resp, message: ' mail or code invalid, o code has expired' });
        } else {
            await this.codeService.actualizarCodigo(resp.code);
            return res.status(HttpStatus.OK).json({ ...resp, message: ' el codigo se valido con exito' });
        }
    }

    @Post('change-password')
    @ApiOperation({ summary: 'Cambiar contraseña' })
    @ApiCreatedResponse({ description: 'The password has been successfully change.', type: CredentialsDto, status: 200 })
    @ApiBadRequestResponse({ description: 'Contraseña distintas' })
    @ApiResponse({ status: 400, description: "password different" })
    @ApiResponse({ status: 403, description: "ProhibidoForbidden" })
    @ApiResponse({ status: 404, description: "Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: CredentialsDto })
    public async changuePass(@Response() res, @Body() credentials: CredentialsDto) {
        const resp = await this.codeService.findOne(credentials.codeID);
        console.log('resp find code: ', resp);
        /*  const validate = {
             email: credentials.email,
             nroCel: credentials.nroCel,
             code: credentials.code
         } as ValidateDto */
        const respuesta = await this.codeService.validateMailandCodigo(credentials as unknown as ValidateDto);
        if ((credentials.pass === credentials.repeatPass)) {
            if (resp && resp.validate === true && resp.uso === false) {
                await this.usersService.updatePassword(credentials);
                await this.codeService.actualizarUsoCodigo(respuesta.code);
                return res.status(HttpStatus.OK).json({ message: 'se cambio la contraseña con exito' });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Error al cambiar la contraseña, codigo no valido o codigo ya usado' });
            }
            // return res.status(HttpStatus.OK).json({message: 'se cambio la contraseña con exito'});
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error: Contraseña distintas' });
        }
    }

    @Get('validate-email/:email')
    @ApiOperation({ summary: 'End point para validar email' })
    @ApiOkResponse({ description: 'Email existe.', status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    public async validateEmail(@Response() res, @Param() param: ValidateMailDto) {
        const result = await this.usersService.findByEmailForValidate(param.email);
        if (result) {
            return res.status(HttpStatus.OK).json({
                validate: true,
            });
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                error: 'email_not_found',
                message: 'Email not found',
            });
        }
    }

    /* @Get('validate-nickname/:nickname')
    @ApiOperation({ summary: 'End point para validations nickName' })
    @ApiResponse({ description: 'nickName existe.', status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "nickName Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    public async validateNick(@Response() res, @Param('nickname') nickname: any) {
        const result = await this.usersService.findByNickName(nickname);
        if (result) {
            return res.status(HttpStatus.OK).json({
                validate: true,
            });
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                error: 'nickname_not_found',
                message: 'Nickname not found',
            });
        }
    } */


    @Get('recovery/sms/:nroCel')
    @ApiOperation({ summary: 'End point para enviar el numero' })
    @ApiResponse({ description: 'the sms was sent successfully.', status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "number Not found" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: "internal server error" })
    public async validateNumber(@Response() res, @Param() numberRecovery: NumberRecoveryDto) {
        this.logger.log(numberRecovery.nroCel);
        const result = await this.usersService.findByNumCel(numberRecovery.nroCel);
        console.log('nro de recuperacion: ', numberRecovery.nroCel);
        console.log('encontro el usuario?: ', result);
        // const codigo = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
        let codigo = '';
        const ref = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 6; i++) {
            codigo += ref.charAt(Math.floor(Math.random() * ref.length));
        }
        const code: CodeDto = {
            email: null,
            nroCel: numberRecovery.nroCel,
            code: codigo,
            validate: false,
            expiredAt: moment().add(30, 'm').format('YYYY-MM-DD HH:mm'),
            uso: false,
        };

        if (result.success) {
            client.messages
                .create({
                    body: 'codigo de restablecimiento de contraseña: ' + codigo,
                    from: '+12054489977',
                    to: numberRecovery.nroCel,
                })
                .then(message => {
                    // tslint:disable-next-line: semicolon
                    console.log(message.sid)
                    const result = this.codeService.saveCode(code);
                    return res.status(HttpStatus.OK).json('Se guardo el codigo correctamente');
                })
                .then(err => {
                    console.log('error: ', err);
                    return res.status(HttpStatus.BAD_REQUEST).json({ err, message: 'Ocurrio un error al enviar el sms' });
                });
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'user not exist', message: 'usario no existente' });
        }

    }
}
