import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRequestPayload } from './contracts/user.payload';

@Injectable()
export class UserService {
      constructor(
            @InjectRepository(User)
            private readonly userRepo: Repository<User>,
      ) { }

      async create(payload: UserRequestPayload) {
            const passwordHash = await bcrypt.hash(payload.password, 10);

            const exists = await this.userRepo.findOne({
                  where: [{ email: payload.email }, { username: payload.username }],
            });
            if (exists) {
                  throw new ConflictException('Username hoặc email đã tồn tại');
            }

            const user = this.userRepo.create({
                  name: payload.name,
                  username: payload.username,
                  email: payload.email,
                  passwordHash: passwordHash,
            });

            return this.userRepo.save(user);
      }

      
}