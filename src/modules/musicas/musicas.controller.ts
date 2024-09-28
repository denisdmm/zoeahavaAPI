import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { CreateMusicaDTO } from './dto/create-musica.dto';
import { UpdateMusicaDTO } from './dto/update-musica.dto';

@Controller('musicas')
export class MusicasController {

    constructor(private readonly musicasService: MusicasService){

    }
    @Get()
    findAll(){
        return this.musicasService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.musicasService.findOne(id)
    }

    
    @Post()
    create(@Body() CreateMusicaDTO){
        return this.musicasService.create(CreateMusicaDTO);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() UpdateMusicaDTO: UpdateMusicaDTO ){
        return this.musicasService.update(id,UpdateMusicaDTO);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.musicasService.remove(id);
    }
}
