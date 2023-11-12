import { Module  } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from '@nestjs-modules/ioredis';
import { User } from "./user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot(({
        config: {
          host: 'redis',
          port: 6379,
        },
      })),
  ],
  controllers: [UserController],
  providers: [UserService],
})


export class UserModule {}
