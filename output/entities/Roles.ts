import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("roles_pkey", ["roleId"], { unique: true })
@Entity("roles", { schema: "auth" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("character varying", { name: "role_name", length: 50 })
  roleName: string;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
