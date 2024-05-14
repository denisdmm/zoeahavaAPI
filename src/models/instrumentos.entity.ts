import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Musicas } from "./musicas.entity"

@Entity('instrumentos')
export class Instrumentos{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeInstrumento: string

    @Column('json',{nullable: true})
    naipe: string[]

    @ManyToMany(()=>Musicas, musica=>musica.instrumentos)
    musicas: Musicas[]

}
