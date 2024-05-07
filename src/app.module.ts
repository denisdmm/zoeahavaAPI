import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicasController } from './musicas/musicas.controller';
import { MusicasService } from './musicas/musicas.service';
import { MusicasModule } from './musicas/musicas.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MusicasModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
