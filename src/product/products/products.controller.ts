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
import { ProductsService } from './products.service';
import { ProductsDto } from 'src/dto/datatransfer.dto';
import { Products } from 'output/entities/Products';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductsController {
  constructor(private Services: ProductsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getProducts();
  }

  @Get('/page/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<Products>> {
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
    return await this.Services.getProductsById(id);
  }

  @Post()
  public async Create(@Body() productsDto: ProductsDto) {
    return await this.Services.addProducts(productsDto);
  }

  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() productsDto: ProductsDto,
  ) {
    return await this.Services.updateProducts(id, productsDto);
  }

  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteProducts(id);
  }
}
