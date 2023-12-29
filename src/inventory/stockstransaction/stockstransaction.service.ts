import { StockTransactions } from 'output/entities/StockTransactions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, Brackets } from 'typeorm';
import { StockTransactionsDto } from 'src/dto/datatransfer.dto';

@Injectable()
export class StocksTransactionsService {
  constructor(
    @InjectRepository(StockTransactions)
    private serviceRepo: Repository<StockTransactions>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<StockTransactions>> {
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
    return paginate<StockTransactions>(queryBuilder, options);
  }

  public async getStocksTransaction() {
    return await this.serviceRepo.find({
      relations: {
        stock: true,
      },
    });
  }

  public async getStocksTransactionById(id: number) {
    return await this.serviceRepo.findOne({
      where: { transactionId: id },
      relations: {
        stock: true,
      },
    });
  }

  public async addStocksTransactions(
    stockTransactionsDto: StockTransactionsDto,
  ) {
    try {
      const stocksTransaction =
        await this.serviceRepo.save(stockTransactionsDto);
      return stocksTransaction;
    } catch (error) {
      return error.message;
    }
  }

  public async updateStocksTransaction(
    id: number,
    stockTransactionsDto: StockTransactionsDto,
  ) {
    try {
      const stocksTransaction = await this.serviceRepo.update(
        id,
        stockTransactionsDto,
      );
      return stocksTransaction;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteStocksTransaction(id: number) {
    try {
      const stocksTransaction = await this.serviceRepo.delete(id);
      return stocksTransaction;
    } catch (error) {
      return error.message;
    }
  }
}
