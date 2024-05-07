import { Module } from '@nestjs/common';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musicas } from 'src/entities/musicas.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Musicas])],
    controllers: [MusicasController],
    providers: [MusicasService]

})
export class MusicasModule {}
