import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { create } from 'domain';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};
    @Post('register')
    async register(
        @Body() CreateUserDto: CreateUserDto
    ): Promise<{token :string}>{
        const token = await this.authService.register(CreateUserDto);
        return {token}


    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<{token :string}>{
        const token = await this.authService.login(loginDto);
        return {token}


    }
}
