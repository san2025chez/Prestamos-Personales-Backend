import { Body, Controller, Delete, Get, HttpStatus, Param, Post ,Put,Response} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { create } from 'domain';
import { UsersService } from 'src/users/user.service';
import { LoanDto } from './dto/loanDto.dto';
import { PrestamoDto } from './dto/PrestamoDto';
import { updateLoanDTO } from './dto/updateLoan.dto';
import { Prestamo } from './prestamo.entity';
import { PrestamoService } from './prestamo.service';

@Crud({
    model: {
        type:Prestamo,
    },
    routes: {
        createOneBase: {
            decorators: [ApiBody({ type: PrestamoDto })]
        }
    },
    serialize: {
        create: PrestamoDto,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },

  
})



@ApiTags('Loans')
@Controller('loans')
export class PrestamoController {
    constructor(
        public service: PrestamoService,
        public serviceUser: UsersService,
       

    ) { }

    @Post('register')
    // @UseGuards(AuthGuard('jwt'), PermissionGuard)
    // @Permision('seller')
    @ApiOperation({ summary: 'Registra un producto en un commercio' })
    @ApiCreatedResponse({ description: 'The product has been successfully created.', type: PrestamoDto })
    @ApiBody({ type: PrestamoDto })
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: '\'The resource was not found\'' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })

    public async savePrestamo(@Response() res, @Body() createProductDto: PrestamoDto): Promise<any> {
        console.log('body create product: ', createProductDto);

        try {
            let userfull = await this.serviceUser.findOne(createProductDto.user);

          
            if (userfull) {
                let loanSave = {
                    user:userfull.id,
                    monto: createProductDto.monto,
                    interes: createProductDto.interes,
                    montoTotal: createProductDto.montoTotal,
                  prenda: createProductDto.prenda,
                  descripcion: createProductDto.descripcion,
                  userficticio: userfull.firstName,
                  lastNameficticio: userfull.lastName
                   
                }
               /*  if(loanSave){
                    var loan: LoanDto={
                        user:userfull,
                        monto: loanSave.monto,
                        interes:loanSave.interes,
                        montoTotal: loanSave.montoTotal,
                      prenda: loanSave.prenda,
                      descripcion: loanSave.descripcion,
                       
                    }
                } */
                

                console.log('producto a guardar: ', loanSave);

                       

                const product = await this.service.savePrestamo(loanSave);

                //no devuelve commerce upadate
             
                return res.status(HttpStatus.OK).json(product);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'comercio o tipo de producto no encontrados' });
            }

        } catch (error) {
            console.log('error al crear producto: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el producto', error });
        }
    }


    @Get()


    /* @UseGuards(AuthGuard('jwt')) */
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: '\'The resource was not found\'' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async getProducts(@Response() res): Promise<any> {
        const products = await this.service.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }



    @Put('/editLoan/:id')
    public async putProducts(@Response() res, @Param() param, @Body() createLoanDto: updateLoanDTO): Promise<any> {
    console.log("ingreso a modificar");
    
        try {

            let loan = await this.service.findOne(param.id);
            console.log(loan);
            
            if (loan) {
                let loanMod = {
                    id:param.id,
                    monto: createLoanDto.monto,
                    interes: createLoanDto.interes,
                    montoTotal: createLoanDto.montoTotal,   
                    prenda: createLoanDto.prenda,
                    descripcion: createLoanDto.descripcion,
                
                    user: createLoanDto.user,
                    date:createLoanDto.date,
                    origen:createLoanDto.origen,
                    userficticio: createLoanDto.userficticio,
                    lastNameficticio: createLoanDto.lastNameficticio,
                    createAt: createLoanDto.createAt,
                }
console.log("compruebo",loanMod);

                const producto = await this.service.updateLoan(loanMod);
                return res.status(HttpStatus.OK).json(producto);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: ' loan no encontrados' });
            }

        } catch (error) {
            console.log('error al modifcar producto: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el producto', error });

        }
}
@Delete('/:id')
@ApiResponse({ status: 200, description: 'data returned correctly' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 404, description: '\'The resource was not found\'' })
@ApiResponse({ status: 409, description: 'Conflict' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
public async deleteProducts(@Response() res, @Param() param): Promise<any> {
    await this.service.deleteLoan(param.id);
    return res.status(HttpStatus.OK).json({ message: 'loan deleted' });
}
}
