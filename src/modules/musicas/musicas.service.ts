import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrumentos } from 'src/models/instrumentos.entity';
import { CreateMusicaDTO } from './dto/create-musica.dto';
import { UpdateMusicaDTO } from './dto/update-musica.dto';
import { Musicas } from 'src/models/musicas.entity';
@Injectable()
export class MusicasService {
    
    constructor(
        @InjectRepository(Musicas)
        private readonly musicaRepository: Repository<Musicas>,

        @InjectRepository(Instrumentos)
        private readonly instrumentosRepository: Repository<Instrumentos>

    ){}

    async findAll(){
        return this.musicaRepository.find({
            relations: [ 'instrumentos' ],
        });
        
    }

    async findOne(id: number){
        const musica = await this.musicaRepository.findOne({
            where: { id},
            relations: ['instrumentos'],
        }) 
        if(!musica){
            throw new HttpException(`Musica ID ${id} not fount`, HttpStatus.NOT_FOUND)
        }
        return musica
    }

    async create(createMusicaDto: CreateMusicaDTO){

        const instrumentos = await Promise.all(
            createMusicaDto.instrumentos.map(nomeInstrumento => this.preloadInstrumentoByName(nomeInstrumento.toUpperCase())),
          )

        const musica = this.musicaRepository.create({
            ...createMusicaDto,
            instrumentos
        })
        return this.musicaRepository.save(musica)
    }

    async update(id: number, updateMusicaDto: UpdateMusicaDTO){

        const instrumentos = updateMusicaDto.instrumentos &&
      (await Promise.all(
        updateMusicaDto.instrumentos.map(nomeInstrumento => this.preloadInstrumentoByName(nomeInstrumento.toUpperCase())),
      ))

      const musica = await this.musicaRepository.preload({
            ...updateMusicaDto,
            id,
            instrumentos
        })
        if (!musica) {
            throw new HttpException(`Musica ID ${id} not fount`, HttpStatus.NOT_FOUND)
        }

        return this.musicaRepository.save(musica)
        
    }

    async remove(id: number){
        const musica = await this.musicaRepository.findOne({
            where: {id}
        })
        if(!musica){

            throw new NotFoundException(`Música com ${id}, não encontrada`)
        }
        return this.musicaRepository.remove(musica)
    }

    private async preloadInstrumentoByName(nomeInstrumento: string): Promise<Instrumentos> {
        const instrumento = await this.instrumentosRepository.findOne({ where: { nomeInstrumento } })
        if ( instrumento) {
          return instrumento
        }
        return this.instrumentosRepository.create({ nomeInstrumento })
      }
}

