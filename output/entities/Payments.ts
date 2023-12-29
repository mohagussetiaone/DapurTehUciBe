import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("payments_pkey", ["paymentId"], { unique: true })
@Entity("payments", { schema: "sales" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "integer", name: "payment_id" })
  paymentId: number;

  @Column("character varying", { name: "payment_method", length: 50 })
  paymentMethod: string;

  @Column("timestamp without time zone", {
    name: "payment_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  paymentDate: Date;

  @Column("numeric", { name: "amount" })
  amount: string;

  @ManyToOne(() => Orders, (orders) => orders.payments)
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;
}
