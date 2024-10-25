import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrumentos } from 'src/models/instrumentos.entity';
import { Musicas } from 'src/models/musicas.entity';
import { Usuario } from 'src/models/usuario.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'motty.db.elephantsql.com',
    port: 5432,
    username: 'fqqhoqqt',
    password: 'gk-GVRQ_vnd8uEIBacQ5YFNv21pIXGEx',
    database: 'fqqhoqqt',
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
