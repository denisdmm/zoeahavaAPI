import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Instrumentos } from "./instrumentos.entity"

@Entity('musicas')
export class Musicas{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeMusica: string

    @Column()
    tonalidade: string

    @Column( {nullable: true})
    descricao: string

    @JoinTable()
    @ManyToMany(()=> Instrumentos, instrumento => instrumento.musicas, {
        cascade: true
    } )
    instrumentos: Instrumentos[]
}
