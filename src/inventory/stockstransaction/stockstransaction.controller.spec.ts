import { Test, TestingModule } from '@nestjs/testing';
import { StockstransactionController } from './stockstransaction.controller';

describe('StockstransactionController', () => {
  let controller: StockstransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockstransactionController],
    }).compile();

    controller = module.get<StockstransactionController>(StockstransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
