import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { Offer } from "./offer.entity";

@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {
  }

  @Get("offers")
  getOffers(): Promise<Offer[]> {
    return this.offerService.getOffers();
  }

  @Get("offers/:id")
  getOfferById(@Param("id") id: string): Promise<Offer> {
    return this.offerService.getOfferById(id);
  }

  @Post("offers")
  addOffer(@Body() offer: Offer): Promise<Offer> {
    return this.offerService.addOffer(offer);
  }

  @Put("offers/:id")
  updateOffer(@Body() offer: Offer, @Param("id") id: string): Promise<Offer> {
    return this.offerService.updateOffer(offer, id);
  }

  @Delete("offers/:id")
  @HttpCode(204)
  deleteOffer(@Param("id") id: string): Promise<any> {
    return this.offerService.deleteOffer(id);
  }
}
