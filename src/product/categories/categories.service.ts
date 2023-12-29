import { Categories } from 'output/entities/Categories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, Brackets } from 'typeorm';
import { categoriesDto } from 'src/dto/datatransfer.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories) private serviceRepo: Repository<Categories>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<Categories>> {
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
    return paginate<Categories>(queryBuilder, options);
  }

  public async getCategories() {
    return await this.serviceRepo.find();
  }

  public async getBankById(id: number) {
    return await this.serviceRepo.findOne({
      where: { categoryId: id },
      relations: {
        products: true,
      },
    });
  }

  public async addBank(categorieDto: categoriesDto) {
    try {
      const categories = await this.serviceRepo.save(categorieDto);
      return categories;
    } catch (error) {
      return error.message;
    }
  }

  public async updateCategories(id: number, categorieDto: categoriesDto) {
    try {
      const bank = await this.serviceRepo.update(id, categorieDto);
      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteCategories(id: number) {
    try {
      const categories = await this.serviceRepo.delete(id);
      return categories;
    } catch (error) {
      return error.message;
    }
  }
}
