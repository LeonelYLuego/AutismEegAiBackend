import { Injectable } from '@nestjs/common';
import { CreateWaveDto } from './dto/create-wave.dto';
import { UpdateWaveDto } from './dto/update-wave.dto';

@Injectable()
export class WavesService {
  create(createWaveDto: CreateWaveDto) {
    return 'This action adds a new wave';
  }

  findAll() {
    return `This action returns all waves`;
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
