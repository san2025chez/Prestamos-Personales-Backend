import { Test, TestingModule } from '@nestjs/testing';
import { IntegracionService } from './integracion.service';

describe('IntegracionService', () => {
  let service: IntegracionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegracionService],
    }).compile();

    service = module.get<IntegracionService>(IntegracionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
