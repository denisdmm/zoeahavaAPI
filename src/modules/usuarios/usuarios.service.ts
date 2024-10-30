import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/models/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createUsuarioDto);

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new HttpException(
        `Usuario ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return usuario;
  }

  findByCpf(cpf: string) {

    const user = this.usuarioRepository.findOne({
      where: { cpf },
    });
    return user

  }

  async findByLogin(loginName: string) {

    const user = await this.usuarioRepository.findOne({
      where: { loginName: loginName },
    });

    return user
  }

  // Encontra o usuário pelo refresh token
  async findByRefreshToken(refreshToken: string) {
    return await this.usuarioRepository.findOne({
      where: { refreshToken: refreshToken }
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      ...updateUsuarioDto,
      id,
    });
    if (!usuario) {
      throw new HttpException(
        `Usuarios ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario com ${id}, não encontrado`);
    }
    return this.usuarioRepository.remove(usuario);
  }
}
