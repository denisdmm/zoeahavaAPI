import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nomeUsuario: string;
  @IsString()
  sobrenome: string;
  @IsString()
  @Length(11, 11, { message: 'CPF deve conter 11 caracteres' })
  cpf: string;
  @IsString()
  login: string;
  @IsString()
  senha: string;
  @IsEmail()
  email: string;
  @IsDate()
  @Type(() => Date) // Transforma a string do request em Date
  dataNascimento: Date;
  @IsBoolean()
  isActive: boolean;
}
