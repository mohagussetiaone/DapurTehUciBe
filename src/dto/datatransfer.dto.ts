// import { Categories } from './../../output/entities/Categories';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { OrderDetails } from 'output/entities/OrderDetails';
import { Categories } from 'output/entities/Categories';
import { Stocks } from 'output/entities/Stocks';
import { StockTransactions } from 'output/entities/StockTransactions';
import { Products } from 'output/entities/Products';

export class categoriesDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}

export class ProductsDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNotEmpty()
  @IsString()
  productName: string;
  @IsNotEmpty()
  @IsString()
  price: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  imageBase64: string;
  orderDetails: OrderDetails[];
  category: Categories;
  stocks: Stocks[];
}

export class StocksDto {
  @IsNotEmpty()
  @IsNumber()
  stockId: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  stockTransactions: StockTransactions[];
  product: Products;
}

export class StockTransactionsDto {
  @IsNotEmpty()
  @IsNumber()
  transactionId: number;
  @IsNotEmpty()
  @IsString()
  transactionType: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  transactionDate: Date;
  @IsNotEmpty()
  @IsString()
  notes: string;
  stock: Stocks;
}
