import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { create } from 'domain';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private userService: UsersService) {};
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

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async profile(
        @Req() req: any
    ): Promise<{email: string}>{
        const user = await this.userService.findUserByEmail(req.user.email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return {email: user.email}
    }
}
