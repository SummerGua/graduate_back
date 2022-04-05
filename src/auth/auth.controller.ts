import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthDto } from 'src/dto/Auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() user: AuthDto) {
    return this.authService.signin(user);
  }

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
