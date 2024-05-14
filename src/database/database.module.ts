import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrumentos } from 'src/models/instrumentos.entity';
import { Musicas } from 'src/models/musicas.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '172.22.0.1',
    port: 5432,
    username: 'coroeorquestra',
    password: '12345',
    database: 'coroeorquestra',
    entities: [
        Musicas,
        Instrumentos
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
