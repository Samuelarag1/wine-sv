import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Wine } from './Wine.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
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

  @Column({
    default:
      'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720915200&semt=sph',
  })
  image: string;

  @Column('int')
  age: number;

  @OneToMany((type) => Wine, (wine) => wine.user)
  wines: Wine[];
}
