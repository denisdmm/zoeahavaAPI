import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@Entity('usuarios')
@Unique(['cpf'])
@Unique(['loginName'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nomeAbreviado: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ unique: true })
  loginName: string;

  @Column()
  senha: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true } )
  instrumento: string;


  @Column({  nullable: true, type: 'date' })
  dataVencimento: Date;

  @Column()
  membroIC: boolean;

  @Column()
  autorizadoPastor: boolean;

  @Column()
  contratoObrigatorio: boolean;
  
  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ default: true })
  isActive: boolean;

  // Adiciona a coluna para armazenar o refreshToken
  @Column({ nullable: true }) // nullable: true se for opcional
  refreshToken: string | null;
 
  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    this.senha = await bcrypt.hash(this.senha, saltRounds);
  }


}
