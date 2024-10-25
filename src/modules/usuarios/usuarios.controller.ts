import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/models/usuario.entity';

@Controller('/api/usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.usuarioService.findOne(id);
  }

  @Get('/logincpf/:cpf')
  async findusuarioByCpf(@Param('cpf') cpf: any): Promise<Usuario> {
    const user = await this.usuarioService.findByCpf(cpf);
    if (!user) {
      throw new NotFoundException(`User with name "${cpf}" not found`);
    }
    return user;
  }

  @Get('/login/:loginName')
  async findusuarioByLogin(
    @Param('loginName') loginName: any,
  ): Promise<Usuario> {
    const user = await this.usuarioService.findByLogin(loginName);
    if (!user) {
      throw new NotFoundException(`User with name "${loginName}" not found`);
    }
    return user;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
