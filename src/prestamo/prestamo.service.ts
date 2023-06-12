import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UsersService } from 'src/users/user.service';
import { PrestamoDto } from './dto/PrestamoDto';
import { updateLoanDTO } from './dto/updateLoan.dto';
import { Prestamo } from './prestamo.entity';

@Injectable()
export class PrestamoService extends TypeOrmCrudService<PrestamoDto>{

  constructor(@InjectRepository(Prestamo) repo, public usersService: UsersService,
  ) {
    super(repo)
  }

  public async createLoan(prestamoDto: PrestamoDto): Promise<PrestamoDto> {
    try {
      // productDto.pic = Buffer.from(productDto.pic).toString('base64');
      let miprestamo = this.repo.create(prestamoDto);
      return await this.repo.save(miprestamo);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public async getLoans(): Promise<PrestamoDto[]> {
    try {
      return await this.repo.find({ relations: ['user'] });
    } catch (error) {
      console.log('error: ', error);
    }
  }
  public async updateLoan(loanDto: updateLoanDTO): Promise<any> {
    let loan = this.repo.create(loanDto);
    return await this.repo.save(loan);
  }


  public async deleteLoan(id: string) {
    await this.repo.delete(id);
  }

}