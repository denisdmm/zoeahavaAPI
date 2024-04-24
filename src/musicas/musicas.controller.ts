import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';

@Controller('musicas')
export class MusicasController {

    @Get()
    findAll(@Res() response){
        return response.status(200).json({message: 'Listagem de Cursos'});
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return `Música com Id ${id}`
    }

    
    @Post()
    create(@Body() body){
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body ){
        console.log(body);
        return `Update da musica ${id}`;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string){
        return `Deletada Musica ${id}`
    }
}
