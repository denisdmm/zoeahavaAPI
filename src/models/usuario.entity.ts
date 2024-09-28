import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({ default: true })
    isActive: boolean;

}
