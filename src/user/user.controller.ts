import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from "./user.entity";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("user/login")
  login(@Body() userLogin: User): Promise<string> {
    return this.userService.login(userLogin);
  }

  @Post("user")
  addUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }
}
