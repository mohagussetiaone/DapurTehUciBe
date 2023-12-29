import { Stocks } from 'output/entities/Stocks';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, Brackets } from 'typeorm';
import { StocksDto } from 'src/dto/datatransfer.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stocks) private serviceRepo: Repository<Stocks>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<Stocks>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.patrUser', 'users')
      .orderBy('c.categoryId', 'ASC')
      .where((qb) => {
        qb.where('c.patrType ilike :patrtype', {
          patrtype: `%${type}%`,
        }).andWhere(
          new Brackets((qb: any) => {
            qb.where('c.patrTrxId ilike :name', { name: `%${name}%` })
              .orWhere('c.patrNote ilike :name', { name: `%${name}%` })
              .orWhere('c.patrOrderNumber ilike :name', { name: `%${name}%` });
          }),
        );
      });
    return paginate<Stocks>(queryBuilder, options);
  }

  public async getStocks() {
    return await this.serviceRepo.find({
      relations: {
        product: true,
        stockTransactions: true,
      },
    });
  }

  public async getStocksById(id: number) {
    return await this.serviceRepo.findOne({
      where: { stockId: id },
      relations: {
        product: true,
        stockTransactions: true,
      },
    });
  }

  public async addStocks(stocksDto: StocksDto) {
    try {
      const stocks = await this.serviceRepo.save(stocksDto);
      return stocks;
    } catch (error) {
      return error.message;
    }
  }

  public async updateStocks(id: number, stocksDto: StocksDto) {
    try {
      const stocks = await this.serviceRepo.update(id, stocksDto);
      return stocks;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteStocks(id: number) {
    try {
      const stocks = await this.serviceRepo.delete(id);
      return stocks;
    } catch (error) {
      return error.message;
    }
  }
}
