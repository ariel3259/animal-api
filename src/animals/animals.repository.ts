import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('animals')
export class AnimalsRepository{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  kind: string;
}