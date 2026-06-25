import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {

    }
    async createUser(data: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(data);
        // Implement user creation logic here
        return await this.usersRepository.save(newUser);
    }
    async findUserByEmail(email: string): Promise<User | null> {
        // Implement user retrieval logic here
        return await this.usersRepository.findOne({ where: { email } });
    }
}
