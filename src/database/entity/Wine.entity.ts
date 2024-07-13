import { User } from 'src/database/entity/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne((type) => User, (user) => user.wines)
  user: User[];
}
