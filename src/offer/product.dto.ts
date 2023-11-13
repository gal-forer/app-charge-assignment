import {
  IsString,
  IsNotEmpty,
  IsCreditCard,
  Length, IsNumber
} from "class-validator";

export class ProductDTO {
  @IsString()
  @IsCreditCard()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(3, 4, { message: 'CVV must be 3 or 4 characters long' })
  readonly amount: number;


}

