import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsDto } from '../dto/credentials.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthenticationService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService, private configService: ConfigService) { }

  async login(credentials: CredentialsDto) {
    const payload = { username: credentials.username };
    return this.generateTokens(payload);
  }

  async register(credentials: CredentialsDto): Promise<User> {
    const existingUser = await this.findOne(credentials.username);
    
    if(existingUser) {
      throw new ConflictException('User already exists');
    }

    credentials.password = await hash(credentials.password, this.configService.get<number>('HASH_SALT'));

    const newUser = new this.userModel(credentials);
    return newUser.save()
  }

  async refresh(username: string) {
    const payload = { username };
    return this.generateTokens(payload);
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  private generateTokens(payload: {username: string}): { access_token: string, refresh_token: string } {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '24h' })
    };
  }
}
