import { Test, TestingModule } from '@nestjs/testing';
import { SubversionController } from './subversion.controller';
import { SubversionService } from './subversion.service';

describe('SubversionController', () => {
  let controller: SubversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubversionController],
      providers: [SubversionService],
    }).compile();

    controller = module.get<SubversionController>(SubversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
