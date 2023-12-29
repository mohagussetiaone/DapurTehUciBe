import { Products } from 'output/entities/Products';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, Brackets } from 'typeorm';
import { ProductsDto } from 'src/dto/datatransfer.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private serviceRepo: Repository<Products>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<Products>> {
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
    return paginate<Products>(queryBuilder, options);
  }

  public async getProducts() {
    return await this.serviceRepo.find({
      relations: {
        category: true,
        stocks: true,
        orderDetails: true,
      },
    });
  }

  public async getProductsById(id: number) {
    return await this.serviceRepo.findOne({
      where: { productId: id },
      relations: {
        category: true,
        stocks: true,
        orderDetails: true,
      },
    });
  }

  public async addProducts(productsDto: ProductsDto) {
    try {
      const products = await this.serviceRepo.save(productsDto);
      return products;
    } catch (error) {
      return error.message;
    }
  }

  public async updateProducts(id: number, productsDto: ProductsDto) {
    try {
      const products = await this.serviceRepo.update(id, productsDto);
      return products;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteProducts(id: number) {
    try {
      const products = await this.serviceRepo.delete(id);
      return products;
    } catch (error) {
      return error.message;
    }
  }
}
