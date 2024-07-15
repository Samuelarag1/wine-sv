import { IsEmail, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

export default class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    if (this.password) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  async comparePasword(password: string): Promise<boolean> {
    console.log('comparando');
    return await bcrypt.compare(password, this.password);
  }
}
