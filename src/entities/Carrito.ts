import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Productos } from './Productos';

@Entity()
export class Carrito extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio: number;

  @Column()
  total: number;

  @Column()
  cantidad: string;

  @OneToMany(() => Productos, productos => productos.id)
    productos: Productos[];
  
}