import { PartialType } from "@nestjs/mapped-types";
import { CreateMusicaDTO } from "./create-musica.dto";

export class UpdateMusicaDTO extends PartialType(CreateMusicaDTO){
    

}