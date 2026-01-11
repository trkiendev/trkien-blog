import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserModule } from './modules/account/user/user.module';
import { AuthenticationModule } from './modules/account/authentication/modules/authentication.module';

@Module({
      imports: [
            ConfigModule.forRoot({
                  isGlobal: true,
            }),
            
            TypeOrmModule.forRoot({
                  type: 'postgres',
                  host: 'localhost',
                  port: 5432,
                  username: 'postgres',
                  password: 'quanque123',
                  database: 'trkienblog',
                  autoLoadEntities: true,
                  synchronize: false, // production: false
            }),

            UserModule,
            AuthenticationModule,

      ],
      controllers: [AppController],
      providers: [AppService],

})


export class AppModule {}
