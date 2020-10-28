import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategyService } from './strategies/jwt-strategy.service';
import { LocalStrategyService } from './strategies/local-strategy.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }
      }),
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategyService, JwtStrategyService]
})
export class AuthenticationModule { }
