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

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async comparePasword(password: string): Promise<boolean> {
    console.log('comparando');
    return await bcrypt.compare(password, this.password);
  }

  @Column()
  image: string;

  @Column('int')
  age: number;

  @OneToMany((type) => Wine, (wine) => wine.user)
  wines: Wine[];
}
