import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { PatientsService } from '@patients/patients.service';
import { PatientsModule } from '@patients/patients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Study]), PatientsModule],
  controllers: [StudiesController],
  providers: [StudiesService],
})
export class StudiesModule {}
