import { Body, Controller, Next, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CredentialsDto } from './dto/credentials.dto'
import { AuthenticationService } from './services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  login(@Body() credentials: CredentialsDto) {
    return this.authenticationService.login(credentials);
  }
}
