import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicasController } from './musicas/musicas.controller';

@Module({
  imports: [],
  controllers: [AppController, MusicasController],
  providers: [AppService],
})
export class AppModule {}
