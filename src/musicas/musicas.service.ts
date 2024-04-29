import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Musicas } from './musicas.entity';

@Injectable()
export class MusicasService {
    private musicas: Musicas[] = [
        {
            id: 1,
            nome: "Let me soul",
            description: "musica linsta",
            instrumentos: ['sax alto', 'sax tonor','violino', 'piano']
        }

    ]

    findAll(){
        return this.musicas;
    }

    findOne(id: number){
        const musica =  this.musicas.find(musica => musica.id === id)
        if(!musica){
            throw new HttpException(`Musica ID ${id} not fount`, HttpStatus.NOT_FOUND)
        }
        return musica
    }

    create(createMusicaDto: any){

        this.musicas.push(createMusicaDto)
    }

    update(id: number, updateMusicaDto: any){
        const idMusica = this.findOne(id)

        if(idMusica as any){
            const index = this.musicas.findIndex(musica => musica.id === id)
            this.musicas[index] = {
                id,
                ...updateMusicaDto
            }
        }
    }

    remove(id: number){
        const index = this.musicas.findIndex(musica => musica.id === id)

        if(index > 0){
            this.musicas.splice(index, 1)
        }
    }
}

