import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import {Strategy, ExtractJwt} from "passport-jwt";
import { ConfigService } from '@nestjs/config';
@Injectable()
export  class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){

      const jwtsecret = configService.get<string>('JWT_SECRET');
      if(!jwtsecret) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
      }
      super({
        jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtsecret
      })
    }

    async validate(payload: any){
        return {id: payload.id, email: payload.email};
        }
}