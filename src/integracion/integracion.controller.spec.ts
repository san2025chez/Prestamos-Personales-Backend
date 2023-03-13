import { Test, TestingModule } from '@nestjs/testing';
import { IntegracionController } from './integracion.controller';

describe('Integracion Controller', () => {
  let controller: IntegracionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegracionController],
    }).compile();

    controller = module.get<IntegracionController>(IntegracionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
