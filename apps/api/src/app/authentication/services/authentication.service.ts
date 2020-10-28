import { Injectable } from '@nestjs/common';
import { CredentialsDto } from '../dto/credentials.dto';

@Injectable()
export class AuthenticationService {

  login(credentials: CredentialsDto) {
    return credentials;
  }

}
