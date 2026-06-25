import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService

    ) {}
    async register(CreateUserDto: CreateUserDto){

        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
        CreateUserDto.password = hashedPassword;
        
        const user = await this.userService.createUser(CreateUserDto);
        return this.jwtService.sign({id: user.id, email:  user.email});
    }
    async login(loginDto: LoginDto){
        const user = await this.userService.findUserByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.jwtService.sign({id: user.id, email:  user.email});
    }
}
