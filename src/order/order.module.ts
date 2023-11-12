import { Module  } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from '@nestjs-modules/ioredis';
import { Order } from "./order.entity";
import { OfferModule } from "../offer/offer.module";
import { OfferService } from "../offer/offer.service";
import { Offer } from "../offer/offer.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, Offer]),
    RedisModule.forRoot(({
        config: {
          host: 'redis',
          port: 6379,
        },
      })),
    OfferModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OfferService],
})


export class OrderModule {}
