import { Test, TestingModule } from '@nestjs/testing';
import { PrestamoService } from './prestamo.service';

describe('PrestamoService', () => {
  let service: PrestamoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestamoService],
    }).compile();

    service = module.get<PrestamoService>(PrestamoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
