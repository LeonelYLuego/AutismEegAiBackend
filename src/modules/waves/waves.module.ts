import { Module } from '@nestjs/common';
import { WavesService } from './waves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wave } from './entities/wave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wave])],
  providers: [WavesService],
  exports: [WavesService],
})
export class WavesModule {}
