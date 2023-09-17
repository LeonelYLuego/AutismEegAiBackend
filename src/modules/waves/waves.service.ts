import { Injectable } from '@nestjs/common';
import { CreateWaveDto } from './dto/create-wave.dto';
import { UpdateWaveDto } from './dto/update-wave.dto';
import { ResponseWaveDto } from './dto/response-wave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wave } from './entities/wave.entity';
import { Repository } from 'typeorm';
import { Study } from '@studies/entities/study.entity';

@Injectable()
export class WavesService {
  constructor(@InjectRepository(Wave) private wavesRepository: Repository<Wave>) {}

  async create(createWaveDtos: CreateWaveDto[]) {
    // Save all waves
    const waves = await this.wavesRepository.save(createWaveDtos, { chunk: 1000 });
    // Parse all waves to response dtos
    const response = waves.map((wave) => {
      // Delete study from wave
      delete wave.study;
      const responseWaveDto = new ResponseWaveDto();
      Object.assign(responseWaveDto, wave);
      return responseWaveDto;
    });
    // Return response dtos
    return response;
  }

  async findAll(study: Study): Promise<Wave[]> {
    return await this.wavesRepository.find({
      where: {
        study: study,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} wave`;
  }

  update(id: number, updateWaveDto: UpdateWaveDto) {
    return `This action updates a #${id} wave`;
  }

  remove(id: number) {
    return `This action removes a #${id} wave`;
  }
}
