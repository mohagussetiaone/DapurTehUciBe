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
import { StocksService } from './stocks.service';
import { StocksDto } from 'src/dto/datatransfer.dto';
import { Stocks } from 'output/entities/Stocks';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('stocks')
export class StocksController {
  constructor(private Services: StocksService) {}
  @Get()
  public async getAll() {
    return await this.Services.getStocks();
  }

  @Get('/page/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<Stocks>> {
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
    return await this.Services.getStocksById(id);
  }

  @Post()
  public async Create(@Body() stocksDto: StocksDto) {
    return await this.Services.addStocks(stocksDto);
  }

  @Put(':id')
  public async Update(@Param('id') id: number, @Body() stocksDto: StocksDto) {
    return await this.Services.updateStocks(id, stocksDto);
  }

  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteStocks(id);
  }
}
