import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class BankDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  bankName: string;

  @Column({ type: "varchar", length: 100 })
  accountNumber: string;

  @Column({ type: "varchar", length: 100 })
  routingNumber: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  swiftCode: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  iban: string;

  @Column({ type: "varchar", length: 100 })
  accountHolderName: string;

  @Column({ type: "boolean", default: false })
  isPrimary: boolean;

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
