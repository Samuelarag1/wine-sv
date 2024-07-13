import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDTO from 'src/models/auth/SignInDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() SignInDTO: Record<string, any>) {
    console.log('comparando', SignInDTO);
    return this.authService.Login(SignInDTO.email, SignInDTO.password);
  }
}
