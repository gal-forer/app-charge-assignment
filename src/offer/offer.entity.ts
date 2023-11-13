import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { ProductDTO } from "./product.dto";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  @IsString()
  @IsOptional()
  gameId: string;


  @Column()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  availability: number;

  @Column()
  @IsString()
  @IsOptional()
  offerSetName: string;

  @Column({unique: true})
  @IsString()
  @IsOptional()
  offerSetId: string;

  @Column()
  @IsString()
  @IsOptional()
  sku: string;

  @Column()
  @IsString()
  @IsOptional()
  priceInCents: number;

  @Column()
  @IsString()
  @IsOptional()
  currency: string;

  @Column({ type: 'simple-json' , nullable: true})
  @ValidateNested()
  @IsOptional()
  products: ProductDTO[];
}