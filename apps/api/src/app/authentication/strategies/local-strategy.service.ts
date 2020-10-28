import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDocument } from '../schemas/user.schema';
import { AuthenticationService } from '../services/authentication.service';
import { compare } from 'bcrypt';
@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDocument> {
    const existingUser = await this.authenticationService.findOne(username);

    const passwordMatch = await compare(password, existingUser.password)

    if(existingUser && passwordMatch) {
      return existingUser
    }

    throw new UnauthorizedException(); 
  }
}
