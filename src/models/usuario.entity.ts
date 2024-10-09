import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeUsuario: string

    @Column()
    sobrenome: string

    @Column({ length: 11, unique: true })
    cpf: string

    @Column()
    senha: string

    @Column()
    email: string

    @Column({type: 'date' })
    dataNascimento: Date;

    @Column({ default: true })
    isActive: boolean;

}
