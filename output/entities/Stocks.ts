import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StockTransactions } from "./StockTransactions";
import { Products } from "./Products";

@Index("stocks_pkey", ["stockId"], { unique: true })
@Entity("stocks", { schema: "inventory" })
export class Stocks {
  @PrimaryGeneratedColumn({ type: "integer", name: "stock_id" })
  stockId: number;

  @Column("integer", { name: "quantity", default: () => "0" })
  quantity: number;

  @OneToMany(
    () => StockTransactions,
    (stockTransactions) => stockTransactions.stock
  )
  stockTransactions: StockTransactions[];

  @ManyToOne(() => Products, (products) => products.stocks)
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;
}
