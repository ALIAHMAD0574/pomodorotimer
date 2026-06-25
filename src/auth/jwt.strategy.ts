import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// Removed unused UsersService import
import {Strategy, ExtractJwt} from "passport-jwt";
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService){

      const jwtsecret = configService.get<string>('JWT_SECRET');
      if(!jwtsecret) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
      }
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtsecret
      });
    }

    async validate(payload: any){
        return {id: payload.id, email: payload.email};
        }
}