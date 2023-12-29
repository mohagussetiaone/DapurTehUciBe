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
import { CategoriesService } from './categories.service';
import { categoriesDto } from 'src/dto/datatransfer.dto';
import { Categories } from 'output/entities/Categories';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('categories')
export class CategoriesController {
  constructor(private Services: CategoriesService) {}
  @Get()
  public async getAll() {
    return await this.Services.getCategories();
  }

  @Get('/page/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<Categories>> {
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
    return await this.Services.getBankById(id);
  }

  @Post()
  public async Create(@Body() categorieDto: categoriesDto) {
    return await this.Services.addBank(categorieDto);
  }

  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() categorieDto: categoriesDto,
  ) {
    return await this.Services.updateCategories(id, categorieDto);
  }

  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteCategories(id);
  }
}
