import { Type } from 'class-transformer';
import { isBoolean, IsBoolean, IsDate, IsDateString, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nome: string;
  @IsString()
  nomeAbreviado: string;
  @IsString()
  @Length(11, 11, { message: 'CPF deve conter 11 caracteres' })
  cpf: string;
  @IsString()
  loginName: string;
  @IsString()
  senha: string;
  @IsEmail()
  email: string;
  @IsDate()
  @Type(() => Date) // Transforma a string do request em Date
  dataNascimento: Date;
  @IsBoolean()
  isActive: boolean;
  @IsString()
  instrumento: string;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @IsDateString()
  dataVencimento: Date | null;
  @IsBoolean()
  membroIC: boolean;
  @IsBoolean()
  autorizadoPastor: boolean;
  @IsBoolean()
  contratoObrigatorio: boolean;
  @IsString()
  refreshToken: string
}
