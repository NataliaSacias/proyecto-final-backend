import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Rol extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @OneToMany(() => Usuario, usuario => usuario.id)
  usuario: Usuario[];
}