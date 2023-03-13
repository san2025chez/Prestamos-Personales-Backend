import { Test, TestingModule } from '@nestjs/testing';
import { PrestamoController } from './prestamo.controller';

describe('Prestamo Controller', () => {
  let controller: PrestamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestamoController],
    }).compile();

    controller = module.get<PrestamoController>(PrestamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
