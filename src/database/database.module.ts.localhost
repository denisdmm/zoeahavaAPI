import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrumentos } from 'src/models/instrumentos.entity';
import { Musicas } from 'src/models/musicas.entity';
import { Usuario } from 'src/models/usuario.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '172.17.0.1',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'coroeorquestraDB',
    entities: [
        Musicas,
        Instrumentos,
        Usuario
    ],
    synchronize: true


}
 

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
        useFactory: async () => {
                return {
                    ...dataSourceOptions,
                }
            },
        }),
    ],
})
export class DatabaseModule {}
