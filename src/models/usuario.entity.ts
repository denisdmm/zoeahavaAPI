import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('usuarios')
@Unique(['cpf'])
@Unique(['login'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeUsuario: string;

  @Column()
  sobrenome: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ unique: true })
  login: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ default: true })
  isActive: boolean;
}
