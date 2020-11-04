import { Body, Controller, Get, Next, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto'
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticationService } from './services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  login(@Body() credentials: CredentialsDto) {
    return this.authenticationService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('content')
  async getContent(@Request() req: any) {
    return { content: 'content' }
  }

  @Post('register')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  register(@Body() credentials: CredentialsDto) {
    return this.authenticationService.register(credentials);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refresh(@Request() req: any) {
    return this.authenticationService.refresh(req?.user?.username);
  }
}
