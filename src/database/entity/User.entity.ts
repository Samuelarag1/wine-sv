import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wine } from './Wine.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('int')
  age: number;

  @OneToMany((type) => Wine, (wine) => wine.user)
  wines: Wine[];
}
