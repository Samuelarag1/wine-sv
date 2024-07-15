import SignInDTO from 'src/models/auth/SignInDTO';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/User.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async Login(email: string, pass: string): Promise<SignInDTO> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const comparePasswords = await bcrypt.compare(pass, user.password);

    console.log(comparePasswords);
    if (!comparePasswords) {
      throw new UnauthorizedException('Invalid Password');
    }

    const { password } = user;

    return user;
  }
}
