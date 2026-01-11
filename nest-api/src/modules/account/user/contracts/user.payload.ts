import {  IsEmail, IsString, MinLength } from 'class-validator';

export class UserRequestPayload {
      @IsString()
      name: string;

      @IsString()
      username: string;

      @IsEmail()
      email: string;

      @IsString()
      @MinLength(6)
      password: string;
}

