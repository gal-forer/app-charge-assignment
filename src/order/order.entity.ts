import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreditCardDTO } from "./creditCard.dto";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json' , nullable: true})
  @IsNotEmpty()
  @ValidateNested()
  credit: CreditCardDTO;

  @Column()
  @IsString()
  @IsNotEmpty()
  OfferSetId: string;


}


