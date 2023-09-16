import { Test, TestingModule } from '@nestjs/testing';
import { WavesController } from './waves.controller';
import { WavesService } from './waves.service';

describe('WavesController', () => {
  let controller: WavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WavesController],
      providers: [WavesService],
    }).compile();

    controller = module.get<WavesController>(WavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
