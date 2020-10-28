import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsDto } from '../dto/credentials.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthenticationService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) { }

  async login(credentials: CredentialsDto) {
    const payload = { usename: credentials.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(credentials: CredentialsDto): Promise<User> {
    const existingUser = await this.findOne(credentials.username);
    
    if(existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = new this.userModel(credentials);
    return newUser.save()
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }
}
