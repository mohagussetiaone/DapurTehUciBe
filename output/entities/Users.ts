import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Roles } from "./Roles";

@Index("users_pkey", ["userId"], { unique: true })
@Entity("users", { schema: "auth" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "username", length: 50 })
  username: string;

  @Column("character varying", { name: "email", length: 50 })
  email: string;

  @Column("character varying", { name: "password", length: 50 })
  password: string;

  @Column("text", { name: "address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;
}
