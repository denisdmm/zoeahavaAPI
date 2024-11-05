import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor( 
        private readonly authService : AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post("login")
   async signIn(
        @Body('loginName') loginName: string,
        @Body('senha') senha: string
    ): Promise<AuthResponseDto>{
        return await this.authService.signIn(loginName, senha)
    }

    @HttpCode(HttpStatus.OK)
    @Post("refresh")
   async refresh(
        @Body() body: any ): Promise<AuthResponseDto>{
            const { refreshToken } = body
        return await this.authService.refresh(refreshToken)
    }

  //FNAL
}

