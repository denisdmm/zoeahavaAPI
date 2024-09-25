import { IsBoolean, IsEmail, IsNumber, IsString, Length } from "class-validator"

export class CreateUsuarioDto {
    @IsString()
    nomeUsuario: string
    @IsString()
    sobrenome: string
    @IsString()
    @Length(11, 11, { message: 'CPF deve conter 11 caracteres' })
    cpf: string
    @IsString()
    senha: string
    @IsEmail()
    email: string
    @IsBoolean()
    isActive: boolean;



}
