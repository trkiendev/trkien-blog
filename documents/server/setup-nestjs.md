# 1. Cấu trúc thư mục project
src/
├── app.module.ts        // Root module
├── app.controller.ts   // Controller demo
├── app.service.ts      // Service demo
├── main.ts             // Entry point

Luống xử lý request
HTTP Request
→ Controller
→ Service
→ (Repository / Database)

# 2. Cấu hình app
## Bật Validation toàn cục
Cài: ***npm install class-validator class-transformer***
**main.ts**
```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      app.useGlobalPipes(
            new ValidationPipe({
                  whitelist: true,
                  forbidNonWhitelisted: true,
                  transform: true,
            }),
      );

      await app.listen(3000);
}
bootstrap();
```

## Prefix API
```typescript
app.setGlobalPrefix('api');
```
➡️ Endpoint sẽ là: http://localhost:3000/api/...


# 3. Tạo module API chuẩn
```bash
nest g module users
nest g controller users
nest g service users
```

Kết quả:
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts

# 4. Viết controller + Service chuẩn REST API
## DTO
**users/dto/create-user.dto.ts**

```typescript
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
      @IsString()
      name: string;

      @IsEmail()
      email: string;
}
```

## Service
```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
      private users = [];

      create(dto: CreateUserDto) {
            const user = { id: Date.now(), ...dto };
            this.users.push(user);
            return user;
      }

      findAll() {
            return this.users;
      }
}
```

## Controlller
```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) {}

      @Post()
      create(@Body() dto: CreateUserDto) {
            return this.usersService.create(dto);
      }

      @Get()
      findAll() {
            return this.usersService.findAll();
      }
}

```

# 6. Cấu hình Evironment (.env)
cài: 
```bash
npm install @nestjs/config
```

**app.module.ts**
```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
      imports: [
            ConfigModule.forRoot({
                  isGlobal: true,
            }),
      ],
})
export class AppModule {}
```

**.env**
PORT=3000
NODE_ENV=development

**7. Kết nối Database (PostgreSQL + TypeORM)**
```bash
npm install @nestjs/typeorm typeorm pg
```

**app.module.ts**
```typescript
TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: false, // production: false
}),
```

# 7. Entity mẫu
```typescript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      name: string;

      @Column({ unique: true })
      email: string;
}
```

# 8. Swagger cho API
```bash
npm install @nestjs/swagger swagger-ui-express
```

**main.ts**
```typescript
const config = new DocumentBuilder()
      .setTitle('NestJS API')
      .setVersion('1.0')
      .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);
```

Truy cập: 
```bash
http://localhost:3000/swagger
```

# 9. Cấu trúc khuyến nghị cho API lớn
src/
├── modules/
│   ├── users/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── auth/
│   ├── finance/
│   └── expense/
├── shared/
│   ├── guards/
│   ├── interceptors/
│   ├── exceptions/
│   └── utils/
└── main.ts

# 10. Các package 'gần như bắt buộc' cho API thật
```bash
npm install @nestjs/passport passport passport-jwt
npm install bcrypt
npm install @nestjs/cqrs
```

# 11. run nestjs
```bash
npm run start:dev
```

- swagger: truy cập host/swagger
- api: host/api