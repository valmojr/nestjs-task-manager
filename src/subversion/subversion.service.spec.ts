import { Test, TestingModule } from '@nestjs/testing';
import { SubversionService } from './subversion.service';

describe('SubversionService', () => {
  let service: SubversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubversionService],
    }).compile();

    service = module.get<SubversionService>(SubversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
