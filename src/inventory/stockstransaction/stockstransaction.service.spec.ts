import { Test, TestingModule } from '@nestjs/testing';
import { StockstransactionService } from './stockstransaction.service';

describe('StockstransactionService', () => {
  let service: StockstransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockstransactionService],
    }).compile();

    service = module.get<StockstransactionService>(StockstransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
