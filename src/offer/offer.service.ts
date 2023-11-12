import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer } from "./offer.entity";

@Injectable()
export class OfferService {

  constructor(@InjectRepository(Offer)
              private readonly offerRepository: Repository<Offer>) {
  }

  async getOffers() {
    return this.offerRepository.find();
  }

  async getOfferById(id: string): Promise<Offer> {

    const res = await this.offerRepository.findOne({ where: { "offerSetId": id } });
    if (!res){
      throw new NotFoundException(`Couldn't find an Offer with id ${id}`);
    }
    return res
  }

  async deleteOffer(id: string): Promise<any> {

    const res = await this.offerRepository.findOne({ where: { "offerSetId": id } });
    if (!res){
      throw new NotFoundException(`Couldn't find an Offer with id ${id} to delete`);
    }
    await this.offerRepository.remove(res) ;
    return null // Returns 204
  }

  async addOffer(offer: Offer): Promise<Offer>{
    const res = this.offerRepository.create(offer);
    return await this.offerRepository.save(res);
  }

  async updateOffer(offer: Offer, id: string): Promise<Offer>{
    const res = await this.offerRepository.findOne({ where: { "offerSetId": id } });
    if (!res){
      throw new NotFoundException(`Couldn't find an Offer with id ${id} to update`);
    }
    console.log(offer);
    Object.assign(res, offer);
    return await this.offerRepository.save(res);
  }

}
