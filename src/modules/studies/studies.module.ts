import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { PatientsModule } from '@patients/patients.module';
import { WavesModule } from '@waves/waves.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Study]), 
    PatientsModule, 
    WavesModule
  ],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}
