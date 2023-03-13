import { Controller, Get, Body, Response, HttpStatus, Query, Param, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Rols } from './rols.entity';
import { RolsService } from './rols.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolDto } from './dto/rol.dto';


@Crud({
    model: {
        type: Rols,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})
@ApiTags('Rols')
@Controller('rols')
export class RolsController {
    constructor(public service: RolsService) { }
    @Get('porNombre/:name')

    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async getRols(@Response() res, @Param() nameRol: RolDto): Promise<any> {
        const rol = await this.service.findRol(nameRol.id);

        return res.status(HttpStatus.OK).json(rol);
    }

    @Post('/register')
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    public async crearRols(@Response() res, @Param() nameRol: RolDto): Promise<any> {
        const rol = await this.service.findRol(nameRol.id);

        return res.status(HttpStatus.OK).json(rol);
    }
}
