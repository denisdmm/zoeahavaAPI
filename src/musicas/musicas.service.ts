import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Musicas } from '../entities/musicas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class MusicasService {
    
    constructor(
        @InjectRepository(Musicas)
        private readonly musicaRepository: Repository<Musicas>
    ){

   }


    async findAll(){
        return this.musicaRepository.find();
    }

    async findOne(id: number){
        const musica = await this.musicaRepository.findOne({
            where: { id},
        }) 
        if(!musica){
            throw new HttpException(`Musica ID ${id} not fount`, HttpStatus.NOT_FOUND)
        }
        return musica
    }

    create(createMusicaDto: any){

        const musica = this.musicaRepository.create(createMusicaDto)
        return this.musicaRepository.save(musica)
    }

    async update(id: number, updateMusicaDto: any){
        const musica = await this.musicaRepository.preload({
            ...updateMusicaDto,
            id
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
}

