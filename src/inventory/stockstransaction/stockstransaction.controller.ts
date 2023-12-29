import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StocksTransactionsService } from './stockstransaction.service';
import { StockTransactionsDto } from 'src/dto/datatransfer.dto';
import { StockTransactions } from 'output/entities/StockTransactions';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('stockstransaction')
export class StocksTransactionController {
  constructor(private Services: StocksTransactionsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getStocksTransaction();
  }

  @Get('/page/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<StockTransactions>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findAllData(
      {
        page,
        limit,
      },
      type,
      name,
    );
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getStocksTransactionById(id);
  }

  @Post()
  public async Create(@Body() stockTransactionsDto: StockTransactionsDto) {
    return await this.Services.addStocksTransactions(stockTransactionsDto);
  }

  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() stockTransactionsDto: StockTransactionsDto,
  ) {
    return await this.Services.updateStocksTransaction(
      id,
      stockTransactionsDto,
    );
  }

  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteStocksTransaction(id);
  }
}
