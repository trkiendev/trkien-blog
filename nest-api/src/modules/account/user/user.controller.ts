import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRequestPayload } from "./contracts/user.payload";

@Controller('admin/user')
export class UserController {
      constructor(
            private readonly userService: UserService
      ) {

      }

      @Post()
      create(@Body() payload: UserRequestPayload) {
            return this.userService.create(payload);
      }
}