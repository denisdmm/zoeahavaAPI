import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicasModule } from './modules/musicas/musicas.module';
import { DatabaseModule } from './database/database.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [MusicasModule, DatabaseModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
