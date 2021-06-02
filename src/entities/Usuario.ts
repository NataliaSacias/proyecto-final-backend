import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';
import { Pedidos } from './Pedidos';
import { Direccion } from './Direccion';
import { Rol } from './Rol';

@Entity()
export class Usuario extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pedidos, pedidos => pedidos.id)
    pedidos: Pedidos[];

  @OneToMany(() => Direccion, direccion => direccion.id)
    direccion: Direccion[];
  
  @ManyToOne(() => Rol, rol => rol.id)
    rol: Rol;
}