import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateUsuarioDto {
    @IsString()
    nomeUsuario: string
    @IsString()
    sobrenome: string
    @IsNumber()
    cpf: number
    @IsString()
    senha: string
    @IsString()
    email: string
    @IsBoolean()
    isActive: boolean;



}
