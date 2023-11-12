import { Module  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from "./offer/offer.module";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./offer/offer.entity";
import { User } from "./user/user.entity";
import { Order } from "./order/order.entity";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [Offer, User, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer, User, Order]),
    OfferModule,
    UserModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
