import { Files } from './File.entity';
import { User } from 'src/database/entity/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Wine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  year: number;

  @Column('text')
  type: string;

  @Column('text')
  grape: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image?: string;

  @Column('int')
  price: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.wines)
  @JoinColumn({ name: 'userId' })
  user: User[];

  @OneToMany(() => Files, (file) => file.wine)
  @JoinColumn({ name: 'photoId' })
  photos: Files[];
}
