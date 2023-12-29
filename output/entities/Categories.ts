import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("categories_pkey", ["categoryId"], { unique: true })
@Entity("categories", { schema: "product" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "integer", name: "category_id" })
  categoryId: number;

  @Column("character varying", { name: "category_name", length: 50 })
  categoryName: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
