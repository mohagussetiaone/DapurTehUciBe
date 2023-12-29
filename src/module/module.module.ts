import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'output/entities/Categories';
import { Products } from 'output/entities/Products';
import { StockTransactions } from 'output/entities/StockTransactions';
import { Stocks } from 'output/entities/Stocks';
import { StocksController } from 'src/inventory/stocks/stocks.controller';
import { StocksService } from 'src/inventory/stocks/stocks.service';
import { StocksTransactionController } from 'src/inventory/stockstransaction/stockstransaction.controller';
import { StocksTransactionsService } from 'src/inventory/stockstransaction/stockstransaction.service';
import { CategoriesController } from 'src/product/categories/categories.controller';
import { CategoriesService } from 'src/product/categories/categories.service';
import { ProductsController } from 'src/product/products/products.controller';
import { ProductsService } from 'src/product/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products, Stocks, StockTransactions]),
  ],
  providers: [
    CategoriesService,
    ProductsService,
    StocksService,
    StocksTransactionsService,
  ],
  controllers: [
    CategoriesController,
    ProductsController,
    StocksController,
    StocksTransactionController,
  ],
  exports: [],
})
export class ModuleModule {}
