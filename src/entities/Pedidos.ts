import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, 
  BaseEntity, JoinColumn
} from 'typeorm';
import { Carrito } from './Carrito';
import { Usuario } from './Usuario';

@Entity()
export class Pedidos extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @OneToOne(() => Carrito)
  @JoinColumn()
  carrito: Carrito;
  
  @ManyToOne(() => Usuario, usuario => usuario.id)
    usuario: Usuario;

}