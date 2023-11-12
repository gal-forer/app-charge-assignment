import { Injectable, UnauthorizedException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from 'crypto';
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { User } from "./user.entity";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>, @InjectRedis() private readonly redis: Redis) {
  }

  async login(user: User): Promise<string> {
    const uuidString: string = uuidv4();
    const res = await this.userRepository.findOne({ where: { "playerId": user.playerId } });
    console.log(res);
    if (!res || this.decrypt(res.password, user.playerId) != user.password){
      throw new UnauthorizedException(`The username or password is not correct`);
    }
    await this.redis.set(user.playerId, uuidString, 'EX', 300);
    return uuidString
  }

  async addUser(user: User): Promise<User> {
    // Encrypt
    console.log(user);
    const encryptedText = this.encrypt(user.password, user.playerId);
    const res = this.userRepository.create({
      "playerId": user.playerId,
      "password": encryptedText
    });
    return await this.userRepository.save(res);
  }

  encrypt(text: string, secret: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', secret);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedText: string, secret: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', secret);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }

}
