import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';

describe('Mailer Controller', () => {
  let controller: MailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
    }).compile();

    controller = module.get<MailerController>(MailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
