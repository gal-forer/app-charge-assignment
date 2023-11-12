import { IsString, ValidateNested } from "class-validator";
import { CreditCardDTO } from "./creditCard.dto";

export class OrderDTO {

  @ValidateNested()
  readonly credit: CreditCardDTO

  @IsString()
  readonly sessionId: string;

  @IsString()
  readonly offerSetId: string;

}

