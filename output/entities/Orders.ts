import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { Users } from "./Users";
import { Payments } from "./Payments";

@Index("orders_pkey", ["orderId"], { unique: true })
@Entity("orders", { schema: "sales" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "integer", name: "order_id" })
  orderId: number;

  @Column("timestamp without time zone", {
    name: "order_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  orderDate: Date;

  @Column("numeric", { name: "total_amount" })
  totalAmount: string;

  @Column("character varying", { name: "status", length: 50 })
  status: string;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Payments, (payments) => payments.order)
  payments: Payments[];
}
