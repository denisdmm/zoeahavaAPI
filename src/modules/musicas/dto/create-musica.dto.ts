import { IsBoolean, IsString, isString } from "class-validator";

export class CreateMusicaDTO{
    @IsString()
    readonly nomeMusica: string;
    @IsString()
	readonly tonalidade: string;
    @IsString()
    readonly descricao: string;
    @IsString()
    readonly compositor: string;
    @IsString()
    readonly arranjo: string;
    @IsString()
    readonly pastaFisica: string;
    @IsString()
    readonly pastaDigital: string;
    @IsBoolean()
    readonly grade: boolean;
    @IsString({each: true})
	readonly instrumentos: string[];


}