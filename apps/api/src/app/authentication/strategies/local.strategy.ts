import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDocument } from '../schemas/user.schema';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDocument> {
    const existingUser = await this.authenticationService.findOne(username);

    if(existingUser && existingUser.password === password) {
      return existingUser
    }

    throw new UnauthorizedException(); 
  }
}
