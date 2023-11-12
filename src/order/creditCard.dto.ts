import {
  IsString,
  IsNumberString,
  IsNotEmpty,
  IsCreditCard,
  Length
} from "class-validator";

export class CreditCardDTO {
  @IsString()
  @IsCreditCard()
  readonly number: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  readonly expDate: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 4, { message: 'CVV must be 3 or 4 characters long' })
  readonly cvv: string;

}

