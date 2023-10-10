import { Injectable } from '@nestjs/common';
import { CreateWaveDto } from './dto/create-wave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wave } from './entities/wave.entity';
import { Repository } from 'typeorm';
import { Study } from '@studies/entities/study.entity';

@Injectable()
export class WavesService {
  constructor(
    @InjectRepository(Wave) private wavesRepository: Repository<Wave>,
  ) {}

  async create(createWavesDto: CreateWaveDto) : Promise<Wave> {
    return this.wavesRepository.save(createWavesDto);
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

  remove(id: number) {
    return `This action removes a #${id} wave`;
  }
}
