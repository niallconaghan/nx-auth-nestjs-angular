import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
