import { Module  } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./offer.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [Offer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer]),
  ],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})


export class OfferModule {}
