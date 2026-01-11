import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthenticationService } from "../services/authenticaiton.service";
import { LoginRequestPayload } from "../contracts/login.payload";
import type { Response } from 'express';

@Controller('/auth')
export class AuthenticationController {
      constructor(private readonly authService: AuthenticationService) {}

      @Post("login") 
      async login(
            @Body() payload: LoginRequestPayload,
            @Res({ passthrough: true }) res: Response,
      ) {
            return this.authService.login(payload, res);
      }
}