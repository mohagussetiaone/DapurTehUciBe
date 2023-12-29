import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Stocks } from "./Stocks";

@Index("stock_transactions_pkey", ["transactionId"], { unique: true })
@Entity("stock_transactions", { schema: "inventory" })
export class StockTransactions {
  @PrimaryGeneratedColumn({ type: "integer", name: "transaction_id" })
  transactionId: number;

  @Column("character varying", { name: "transaction_type", length: 50 })
  transactionType: string;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("timestamp without time zone", {
    name: "transaction_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  transactionDate: Date;

  @Column("text", { name: "notes", nullable: true })
  notes: string | null;

  @ManyToOne(() => Stocks, (stocks) => stocks.stockTransactions)
  @JoinColumn([{ name: "stock_id", referencedColumnName: "stockId" }])
  stock: Stocks;
}
