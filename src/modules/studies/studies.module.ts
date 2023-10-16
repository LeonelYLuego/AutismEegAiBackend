import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { PatientsModule } from '@patients/patients.module';
import { WavesModule } from '@waves/waves.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Study]), 
    PatientsModule, 
    WavesModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 100000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}
