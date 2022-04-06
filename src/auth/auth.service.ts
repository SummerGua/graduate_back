import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from 'src/dto/Auth.dto';
import { User } from './auth.entity';
import { Model } from 'mongoose';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '1m',
      secret: secret,
    });
  }

  // 登录
  async signin(authDto: AuthDto) {
    const user = await this.userModel.findOne({ email: authDto.email });
    if (!user) {
      // 用户不存在
      return {
        code: 200,
        msg: 'user not existed',
      };
    }
    const isSuccessful = await argon.verify(user.password, authDto.password);
    if (isSuccessful) {
      // 登录成功
      const token = await this.signToken(user._id, user.email);
      return {
        code: 200,
        msg: 'correct password',
        token: token,
      };
    } else {
      return {
        code: 200,
        msg: 'wrong password',
      };
    }
  }

  //注册
  async signup(authDto: AuthDto) {
    const existingUser = await this.userModel.findOne({ email: authDto.email });
    if (existingUser) {
      return {
        code: 500,
        msg: 'existed email',
      };
    }
    const hash = await argon.hash(authDto.password);
    const createdUser = await this.userModel.create({
      email: authDto.email,
      password: hash,
    });
    return createdUser;
  }

  async findAll() {
    return this.userModel.find();
  }
}
