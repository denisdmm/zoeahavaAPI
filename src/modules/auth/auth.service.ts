import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly jwtExpirationTime: number;
    private readonly refreshTokenExpirationTime: string = '7d'; // Expiração do refreshToken

    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTime = this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(loginName: string, senha: string): Promise<AuthResponseDto> {
        const user = await this.usuarioService.findByLogin(loginName);
        console.log(user)
        if (!user || !bcryptCompareSync(senha, user.senha)) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const accessToken = this.generateToken(user.id, user.loginName, 'access', this.jwtExpirationTime);
        const refreshToken = this.generateToken(user.id, user.loginName, 'refresh', this.refreshTokenExpirationTime);

        // Atualiza o refreshToken no usuário
        await this.usuarioService.update(user.id, { refreshToken });

        return this.createAuthResponse(accessToken, refreshToken);
    }

    async refresh(refreshToken: string): Promise<AuthResponseDto> {
        const payload = this.verifyToken(refreshToken, 'refresh');

        const userId = Number(payload.sub);
        if (isNaN(userId)) {
            throw new UnauthorizedException('ID do usuário inválido');
        }

        const user = await this.usuarioService.findOne(userId);
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Usuário não encontrado ou token inválido');
        }

        const newAccessToken = this.generateToken(user.id, user.loginName, 'access', this.jwtExpirationTime);
        const newRefreshToken = this.generateToken(user.id, user.loginName, 'refresh', this.refreshTokenExpirationTime);

        // Atualiza o refreshToken no banco de dados
        await this.usuarioService.update(user.id, { refreshToken: newRefreshToken });

        return this.createAuthResponse(newAccessToken, newRefreshToken);
    }

    private generateToken(userId: number, loginName: string, type: string, expiresIn: number | string): string {
        return this.jwtService.sign(
            { sub: userId, loginName, type },
            { expiresIn }
        );
    }

    private verifyToken(token: string, expectedType: string): any {
        const payload = this.jwtService.verify(token);

        if (payload.type !== expectedType) {
            throw new UnauthorizedException(`Token inválido: esperado tipo ${expectedType}`);
        }

        return payload;
    }

    private createAuthResponse(accessToken: string, refreshToken: string): AuthResponseDto {
        return {
            accessToken,
            refreshToken,
            expiresIn: 900, // Tempo em segundos (15 minutos)
            refreshExpiresIn: 604800, // Tempo em segundos (7 dias)
        };
    }
}
