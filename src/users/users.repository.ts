import { PrimaryGeneratedColumn, Entity, Column, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UsersRepository {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  email: string;

  @Column()
  password: string;
}