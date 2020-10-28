import { Body, Controller, Next, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsDto } from './dto/credentials.dto'
import { AuthenticationService } from './services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  login(@Body() credentials: CredentialsDto) {
    return this.authenticationService.login(credentials);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  register(@Body() credentials: CredentialsDto) {
    return this.authenticationService.register(credentials);
  }
}
