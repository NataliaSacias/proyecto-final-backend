import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Direccion extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numCasa: string;

  @Column()
  departamento: string;

  @Column()
  ciudad: string;

  @Column()
  calle: string;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario;
}