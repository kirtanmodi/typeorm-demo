import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

export enum AddressType {
  HOME = "HOME",
  WORK = "WORK",
  OTHER = "OTHER",
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  street: string;

  @Column({ type: "varchar", length: 100 })
  city: string;

  @Column({ type: "varchar", length: 100 })
  state: string;

  @Column({ type: "varchar", length: 20 })
  zipCode: string;

  @Column({ type: "varchar", length: 100 })
  country: string;

  @Column({ type: "boolean", default: false })
  isPrimary: boolean;

  @Column({ type: "enum", enum: AddressType, nullable: true })
  addressType: AddressType;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid" })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
