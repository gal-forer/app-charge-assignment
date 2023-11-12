import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Order } from "./order.entity";
import { CreditCardDTO } from "./creditCard.dto";
import { OfferService } from "../offer/offer.service";

@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order)
              private readonly ordersRepository: Repository<Order>, @InjectRedis() private readonly redis: Redis, private readonly offerService: OfferService) {
  }

  async addOrder(credit: CreditCardDTO, offerSetId: string, sessionId: string): Promise<string> {
    // Encrypt
    const loginStatus = await this.checkLoginStatus(sessionId);
    if (!loginStatus || !loginStatus["connected"]) {
      throw new UnauthorizedException(`Not signed in`);
    }
    await this.validateOffer(offerSetId)
    this.validateCreditCard(credit)
    const order = {
      "OfferSetId": offerSetId,
      "credit": credit
    } as Order;
    const res = this.ordersRepository.create(order);
    await this.ordersRepository.save(res);
    const encryptedText = this.encrypt(res.id.toString(), loginStatus["user"]);
    return encryptedText;
  }

  validateCreditCard(card: CreditCardDTO) {
    const numericRegex = /^[0-9]+$/;
    const month = card.expDate.substring(0, 2);
    const year = card.expDate.substring(2, 4);
    console.log(year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearTwoDigits = currentYear % 100;
    console.log(currentYearTwoDigits);
    const currentMonth = currentDate.getMonth() + 1;
    if (Number(year) < currentYearTwoDigits){
      throw new HttpException('Card expiredss', HttpStatus.EXPECTATION_FAILED);
    }
    else if (Number(year) == currentYearTwoDigits && Number(month) <= currentMonth){
      throw new HttpException('Card expired', HttpStatus.EXPECTATION_FAILED);
    }
    else if (!numericRegex.test(card.cvv) && (card.cvv.length < 3 || card.cvv.length > 4 )){
      throw new HttpException('CVV is wrong', HttpStatus.EXPECTATION_FAILED);
    }
    else if (!this.isCreditCardNumberValid(card.number)){
      throw new HttpException('Credit card number is not valid', HttpStatus.EXPECTATION_FAILED);
    }
  }

  isCreditCardNumberValid(creditCardNumber: string): boolean {
    const cleanedNumber = creditCardNumber.replace(/\D/g, '');
    if (!/^\d{13,19}$/.test(cleanedNumber)) {
      return false;
    }

    let sum = 0;
    let double = false;

    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let digit = +cleanedNumber[i];

      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  }

  async validateOffer(offerSetId: string) {
    const offer = await this.offerService.getOfferById(offerSetId)
    if (!offer){
      throw new NotFoundException(`Couldn't find an Offer with offerSetId ${offerSetId}`);
    }
    if (offer.availability <= 0){
      throw new HttpException('Offer is not available', HttpStatus.I_AM_A_TEAPOT); // lol
    }
    offer.availability -= 1;
    await this.offerService.updateOffer(offer, offerSetId);
  }

  async checkLoginStatus(sessionId: string): Promise<any> {
    const user = await this.valueExists(sessionId);
    const valid = user != null;
    console.log(user);
    return { "user": user, "connected": valid };
  }


  async valueExists(value: any): Promise<string> {
    const keys = await this.redis.keys("*");

    for (const key of keys) {
      const storedValue = await this.redis.get(key);
      if (storedValue === value) {
        return key;
      }
    }

    return null;
  }

  encrypt(text: string, secret: string): string {
    const cipher = crypto.createCipher("aes-256-cbc", secret);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }


}
