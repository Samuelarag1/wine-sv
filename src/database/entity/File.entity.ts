import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';
import { Wine } from './Wine.entity';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Filename' })
  filename: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos)
  user?: User;

  @ManyToOne(() => Wine, (wine) => wine.photos)
  wine?: Wine;
}
