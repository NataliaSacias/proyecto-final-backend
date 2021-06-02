import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Carrito } from './Carrito';

@Entity()
export class Productos extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock: number;

  @Column()
  precio: number;

  @Column(/* {unique: true} */)
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fotoDePortada: string;

  @ManyToOne(() => Carrito, carrito => carrito.id)
    carrito: Carrito;

}