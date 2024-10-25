import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ 
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => {
        // Adicione esse log para verificar o valor de JWT_SECRET
        console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET'));

        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { 
            expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')
          }
        };
      },
      inject: [ConfigService],
    }), 
    UsuariosModule
  ]
})
export class AuthModule {}
