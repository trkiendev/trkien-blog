import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { AuthenticationController } from "../controllers/authentication.controller";
import { AuthenticationService } from "../services/authenticaiton.service";
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Module({
      imports: [ 
            TypeOrmModule.forFeature([User]),
            JwtModule.registerAsync({
                  inject: [ConfigService],
                  useFactory: (config: ConfigService) => ({
                        secret: process.env.JWT_SECRET,
                        signOptions: {
                              expiresIn: '15m',
                        },
                  })
            }),
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
})
export class AuthenticationModule {


}