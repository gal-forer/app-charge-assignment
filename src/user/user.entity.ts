import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class User {
  @PrimaryColumn()
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

}