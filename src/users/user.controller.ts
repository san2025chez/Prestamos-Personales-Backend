import { Controller, Response, HttpStatus, Get, Param, Post, Body, Res, Put, Delete } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserDto } from '../users/dto/user.dto'
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiParam, ApiCreatedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserFavoriteDto } from './dto/userFavorite.dto';
import { ParamsUserDto } from './dto/paramsUserDto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ChangePassDto } from './dto/changePass.dto';
import { ErrorChangePassDto } from './dto/errorChangePass.dto';
import { UserFirebaseDto } from './dto/user-firebase.dto';
import { ClienteDto } from './dto/cliente.dto';
import { RolsService } from 'src/rols/rols.service';
import { RegistrationCliente } from 'src/auth/interfaces/registrationCliente';
import { RegistrationResponse } from 'src/auth/interfaces/registartionResponse.interface';
import { UpdateUserDto } from './dto/updateUser.dto';

@Crud({
    model: {
        type: User,
    },
    routes: {
        createOneBase: {
            decorators: [ApiBody({ type: UserDto })]
        }
    },
    serialize: {
        create: UserDto,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },

    query: {
        join: {

            commisions: {
                allow: []
            },
            commerce: {}
        },
    }
})

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(public service: UsersService,
      
        /*   private readonly customerService: CustomerService,
          private readonly sellerService: SellerService,*/
        private readonly rolsService: RolsService,

    ) { }

    @Get()

    //@UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })

    public async getUsers(@Response() res): Promise<any> {
        console.log('get a users');
        const users = await this.service.getAllUsers();
        return res.status(HttpStatus.OK).json(users);

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
                const user = await this.service.registerCliente(userDto);
                console.log("el user creado es",user);
                

                const users = await this.service.updateCliente(user, rol);
                const response: RegistrationCliente  = {
                    success: true,
                    message: 'user registered sucesfull',
                    user,

                };
                console.log(response);

                return res.status(HttpStatus.OK).json(response);
            
        } catch (err) {
          
            const response: RegistrationResponse = { success: false, message: err, user: null };
            return res.status(HttpStatus.OK).json(response);
        }
    }

    @Put('/:id')
    public async putProducts(@Response() res, @Param() param, @Body() createUserDto: UpdateUserDto): Promise<any> {
        console.log("ingreso a editarrrrr");
        
        try {

            let user = await this.service.findOne(param.id);
            console.log(user);
            
            if (user) {
                let productMod = {
                    id: param.id,
                    email: createUserDto.email,
                    password: createUserDto.password,
                    firstName:createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    phone: createUserDto.phone,
                    gender: createUserDto.gender,
                    dni: createUserDto.dni,
                    profilePic: createUserDto.profilePic,
                    pais: createUserDto.pais,
                    provincia: createUserDto.provincia,
                    localidad: createUserDto.localidad,
                    calle: createUserDto.calle,
                    barrio: createUserDto.barrio,
                    numero:createUserDto.numero

                }

                const producto = await this.service.updateUser2(productMod);
                return res.status(HttpStatus.OK).json(producto);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: ' producto no encontrados' });
            }

        } catch (error) {
            console.log('error al modifcar producto: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el producto', error });

        }



    }

    @Get('/:userId')
    @ApiOperation({ summary: 'Obtiene un usuario por su Id' })
    @ApiResponse({ status: 200, description: 'Los datos han sido devueltos correctamente.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async getCommerce(@Response() res, @Param() param): Promise<any> {
        console.log("Id del usuario a buscar",param.userId)
        const user = await this.service.getUsuarioById(param.userId);
        console.log(user);

        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: '\'The resource was not found\'' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async deleteProducts(@Response() res, @Param() param): Promise<any> {
        await this.service.deleteUser(param.id);
        return res.status(HttpStatus.OK).json({ message: 'product deleted' });
    }

   
    @Get('referrers/:nickName')
    @ApiParam({ type: 'string', name: 'nickName' })
    public async getReferrers(@Response() res, @Param() param): Promise<any> {
        const listReferrer = await this.service.getReferrers(param.nickName);
        return res.status(HttpStatus.OK).json(listReferrer);
    }
    

    @Post('change-password/:userId')
    @ApiOperation({ summary: 'password change' })
    @ApiResponse({ status: 200, description: 'was changed password' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiConflictResponse({ description: 'conflict with password form', status: 409, type: ErrorChangePassDto })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiBody({ type: ChangePassDto })
    public async ChangePassword(@Response() res, @Param() param: ParamsUserDto, @Body() changePassDto: ChangePassDto) {
        try {
            const resUser = await this.service.findOne({ id: param.userId });
            if (resUser) {
                const isValidPass = await resUser.comparePassword(changePassDto.backPassword);
                const backSamePass = await this.service.comparePassword(changePassDto.backPassword, changePassDto.newPassword);
                const repatPassSame = await this.service.comparePassword(changePassDto.newPassword, changePassDto.repeatPassword);
                if (!isValidPass) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ error: 'invalid password' });
                }
                if (backSamePass) {
                    return res.status(HttpStatus.CONFLICT).json({ error: 'new and back password not should same' });
                }
                if (!repatPassSame) {
                    return res.status(HttpStatus.CONFLICT).json({ error: 'new and repeat password should same' });
                }
                await this.service.changePass(resUser, changePassDto.newPassword);
                return res.status(HttpStatus.OK).json({ message: 'pass changed succesfull' });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: 404,
                    error: 'user not found',
                    message: 'user not found',
                });
            }
        } catch (error) {
            console.log('error: ', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }


  

    @Post('favorito/:id')
    async saveFavorite(@Res() res, @Body() updateUserDto: UserFavoriteDto, @Param() param) {

        try {
            let users = await this.service.findOne(param.id);
            if (users) {
                users.favorite = updateUserDto.favorite;
                let usuario = await this.service.saveProduct(users);
                return res.status(HttpStatus.OK).json(usuario);

            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'users no encontrado' });
            }

        } catch (error) {

            console.log('error al crear user: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el user', error });

        }

        /*    console.log('llega: ', updateUserDto);

        let response = await this.service.create(param.id, updateUserDto);
        return res.status(HttpStatus.OK).json(response); */
    }

    // console.log('commerce update: ', commerce);
}