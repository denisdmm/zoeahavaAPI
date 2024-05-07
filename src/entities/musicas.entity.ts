import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('musicas')
export class Musicas{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeMusica: string

    @Column()
    tonalidade: string

    @Column()
    descricao: string

    @Column('json',{nullable: true})
    instrumentos: string[]
}
