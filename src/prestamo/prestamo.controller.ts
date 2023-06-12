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
    @ApiOperation({ summary: 'Registra un loano en un commercio' })
    @ApiCreatedResponse({ description: 'The loan has been successfully created.', type: PrestamoDto })
    @ApiBody({ type: PrestamoDto })
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: '\'The resource was not found\'' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })

    public async createLoan(@Response() res, @Body() createLoanDto: PrestamoDto): Promise<any> {

        try {
            let userfull = await this.serviceUser.findOne(createLoanDto.user);

          
            if (userfull) {
                let loanSave = {
                  user:userfull.id,
                  monto: createLoanDto.monto,
                  interes: createLoanDto.interes,
                  montoTotal: createLoanDto.montoTotal,
                  prenda: createLoanDto.prenda,
                  descripcion: createLoanDto.descripcion,
                  userficticio: userfull.firstName,
                  lastNameficticio: userfull.lastName
                   
                }

                const loan = await this.service.createLoan(loanSave);

                return res.status(HttpStatus.OK).json(loan);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'comercio o tipo de loano no encontrados' });
            }

        } catch (error) {
         
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el loano', error });
        }
    }


    @Get()
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: '\'The resource was not found\'' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async getloans(@Response() res): Promise<any> {
        const loans = await this.service.getLoans();
        return res.status(HttpStatus.OK).json(loans);
    }



    @Put('/editLoan/:id')
    public async updateLoan(@Response() res, @Param() param, @Body() createLoanDto: updateLoanDTO): Promise<any> {
    
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


                const loano = await this.service.updateLoan(loanMod);
                return res.status(HttpStatus.OK).json(loano);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: ' loan no encontrados' });
            }

        } catch (error) {
            console.log('error al modifcar loano: ', error);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ocurrio un error al guardar el loano', error });

        }
}
@Delete('/:id')
@ApiResponse({ status: 200, description: 'data returned correctly' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 404, description: '\'The resource was not found\'' })
@ApiResponse({ status: 409, description: 'Conflict' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
public async deleteLoan(@Response() res, @Param() param): Promise<any> {
    await this.service.deleteLoan(param.id);
    return res.status(HttpStatus.OK).json({ message: 'loan deleted' });
}
}
