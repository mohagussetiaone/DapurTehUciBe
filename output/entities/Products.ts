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
import { Categories } from "./Categories";
import { Stocks } from "./Stocks";

@Index("products_pkey", ["productId"], { unique: true })
@Entity("products", { schema: "product" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "product_id" })
  productId: number;

  @Column("character varying", { name: "product_name", length: 100 })
  productName: string;

  @Column("numeric", { name: "price" })
  price: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "image_base64", nullable: true })
  imageBase64: string | null;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;

  @OneToMany(() => Stocks, (stocks) => stocks.product)
  stocks: Stocks[];
}
