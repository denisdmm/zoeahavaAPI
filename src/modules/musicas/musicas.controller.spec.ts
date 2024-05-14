import { Test, TestingModule } from '@nestjs/testing';
import { MusicasController } from './musicas.controller';

describe('MusicaController', () => {
  let controller: MusicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicasController],
    }).compile();

    controller = module.get<MusicasController>(MusicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
