import { Module } from '@nestjs/common';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musicas} from 'src/models/musicas.entity';
import { Instrumentos } from 'src/models/instrumentos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Musicas, Instrumentos])],
    controllers: [MusicasController],
    providers: [MusicasService]

})
export class MusicasModule {}
