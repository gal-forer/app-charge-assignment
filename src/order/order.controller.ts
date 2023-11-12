import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from './order.service';
import { OrderDTO } from "./order.dto";

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("orders")
  addOrder(@Body() order: OrderDTO): Promise<string> {
    return this.orderService.addOrder(order.credit, order.offerSetId, order.sessionId);
  }

}

