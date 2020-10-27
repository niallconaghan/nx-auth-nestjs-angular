import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('authentication')
export class AuthenticationController {

  constructor(private configService: ConfigService) {}
  
}
