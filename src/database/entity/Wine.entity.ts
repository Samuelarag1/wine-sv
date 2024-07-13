import { User } from 'src/database/entity/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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
  description: string;

  @Column('int')
  price: number;

  @Column()
  image: string;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.wines)
  @JoinColumn({ name: 'userId' })
  user: User[];
}
