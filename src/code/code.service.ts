import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './code.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CodeDto } from './dto/code.dto';
import moment = require('moment');
import { ICode } from './interface/code.interface';
import { ValidateDto } from './dto/validateDto.dto';

export interface IValidateResp {
    succeses: boolean;
    code: ICode;
}

@Injectable()
export class CodeService extends TypeOrmCrudService<ICode> {
    constructor(@InjectRepository(Code) repo) {
        super(repo);
    }

    async saveCode(codigo: CodeDto): Promise<any> {
        const newCodigo = this.repo.create(codigo);
        try {
            return await this.repo.save(newCodigo);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async validateMailandCodigo(validate: ValidateDto): Promise<IValidateResp> {
        console.log('mail o nro:', validate);
        
        const resp = validate.email? await this.repo.findOne({ where: { email: validate.email, code: validate.code} }) : await this.repo.findOne({ where: { nroCel: validate.nroCel, code: validate.code } });

        console.log('codigo encontrado: ', resp);

        let validateResp: IValidateResp = {
            succeses: false,
            code: null,
        };
        if (resp) {
            const fecha1 = moment(resp.expiredAt);
            const fecha2 = moment();

            if ((resp.email === validate.email || resp.nroCel === validate.nroCel) && resp.code === validate.code) {
                if (fecha1 >= fecha2) {
                    validateResp.succeses = true;
                    validateResp.code = resp;
                    return validateResp;
                } else {
                    await this.repo.delete({ id: resp.id });
                    return validateResp;
                }
            }
        }
        return validateResp;
    }

    async validateExpired(validate: ValidateDto): Promise<IValidateResp> {
        const resp = await this.repo.findOne({ where: { email: validate.email, code: validate.code } });
        const fecha1 = moment(resp.expiredAt);
        const fecha2 = moment();
        let validateResp: IValidateResp = {
            succeses: false,
            code: null,
        };
        if (fecha1 <= fecha2) {
            validateResp.succeses = true;
            validateResp.code = resp;
            return validateResp;
        }
        return validateResp;
    }

    async actualizarCodigo(codigo: CodeDto): Promise<any> {
        const id: any = codigo.id;
        await this.repo.update({ id }, { validate: !codigo.validate });
    }

    async actualizarUsoCodigo(codigo: CodeDto): Promise<any> {
        const id: any = codigo.id;
        await this.repo.update({ id }, { uso: !codigo.uso });
    }
}
