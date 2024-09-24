import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm"

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeUsuario: string

    @Column()
    sobrenome: string

    @Column()
    cpf: number


    @Column()
    senha: string


    @Column()
    email: string

    @Column({ default: true })
    isActive: boolean;


}
