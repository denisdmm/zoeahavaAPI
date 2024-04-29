import { IsBoolean, IsString } from "class-validator";

export class CreateMusicaDTO{
    @IsString()
    readonly nomeMusica: string;
    @IsString()
	readonly tom: string;
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