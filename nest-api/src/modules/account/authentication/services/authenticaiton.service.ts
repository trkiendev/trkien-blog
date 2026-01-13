import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Repository } from "typeorm";
import { LoginRequestPayload } from "../contracts/login.payload";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';

@Injectable()
export class AuthenticationService {
      constructor(
            @InjectRepository(User)
            private readonly userRepo: Repository<User>,
            private readonly jwtService: JwtService
      ) {}

      async login(payload: LoginRequestPayload, res: Response) {
            const user = await this.validateUser(payload);

            const accessToken = this.jwtService.sign({
                  sub: user.id,
                  email: user.email,
            });

            res.cookie('access_token', accessToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  path: '/',
            });

            return {
                  user: {
                        id: user.id,
                        email: user.email,
                  },
            };
      }

      async validateUser(payload: LoginRequestPayload): Promise<User> {

            const user = await this.userRepo.findOne({
                  where: { email: payload.email }
            });

            if(!user) {
                  throw new UnauthorizedException('Email không tồn tại');
            }

            const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
            if(!isPasswordValid) {
                  throw new UnauthorizedException('Mật khẩu không đúng');
            }

            return user;
      }
}