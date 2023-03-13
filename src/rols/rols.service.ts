import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Rols } from './rols.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolsService extends TypeOrmCrudService<RolDto> {
    constructor(@InjectRepository(Rols) repo) {
        super(repo);
    }

    public async findRol(name: any): Promise<any> {
        console.log('rol name: ', name);
        try {
            const rolEncontrado = await this.repo.findOne({ where: name });
            console.log('rol econtrado: ', rolEncontrado);

            return rolEncontrado;
        } catch (err) {
            console.log('error: ', err);

        }
    }

    /* 
        public async saveRol(productDto: ProductDto): Promise<ProductDto> {
            try {
              // productDto.pic = Buffer.from(productDto.pic).toString('base64');
              let producto = this.repo.create(productDto);
              return await this.repo.save(producto);
            } catch (error) {
              console.log('error: ', error);
            }
          } */
}
