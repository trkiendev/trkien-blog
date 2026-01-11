import { IsEmail, IsString } from "class-validator";

export class LoginRequestPayload {
      @IsEmail()
      email: string;

      @IsString()
      password: string;
}