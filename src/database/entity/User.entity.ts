import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  Unique,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Wine } from './Wine.entity';
import * as bcrypt from 'bcrypt';
import { Files } from './File.entity';

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
    return await bcrypt.compare(password, this.password);
  }

  @Column()
  age: string;

  @OneToMany((type) => Wine, (wine) => wine.user)
  wines: Wine[];

  @OneToMany(() => Files, (file) => file.user)
  @JoinColumn({ name: 'photoId' })
  photos: Files[];
}
