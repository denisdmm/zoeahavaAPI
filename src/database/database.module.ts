import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musicas } from 'src/entities/musicas.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '172.22.0.1',
    port: 5432,
    username: 'coroeorquestra',
    password: '12345',
    database: 'coroeorquestra',
    entities: [
        Musicas
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
