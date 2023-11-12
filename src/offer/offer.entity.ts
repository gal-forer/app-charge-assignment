import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  @IsString()
  @IsNotEmpty()
  gameId: string;


  @Column()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  availability: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  offerSetName: string;

  @Column({unique: true})
  @IsString()
  @IsNotEmpty()
  offerSetId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  priceInCents: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @Column({ type: 'simple-json' , nullable: true})
  @IsNotEmpty()
  products: { amount: number; sku: string, name: string }[];
}