import { Injectable, NotFoundException } from '@nestjs/common';
import { Study } from './entities/study.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientsService } from '@patients/patients.service';
import { Patient } from '@patients/entities/patient.entity';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study) private studiesRepository: Repository<Study>,
    private patientsService: PatientsService,
  ) {}

  async create(patient_id: string): Promise<Study> {
    const patient = await this.patientsService.findOne(patient_id);
    const study = await this.studiesRepository.save({
      patient,
    });
    return await this.findOne(study.id);
  }

  async findAll(patient_id: string): Promise<Study[]> {
    const patient = await this.patientsService.findOne(patient_id);
    return await this.studiesRepository.find({
      where: {
        patient,
      },
    });
  }

  async findOne(id: string, patient_id?: string): Promise<Study> {
    let study: Study | undefined;
    let patient: Patient | undefined;
    try {
      if (patient_id) patient = await this.patientsService.findOne(patient_id);
      study = await this.studiesRepository.findOne({
        where: {
          id,
          patient,
        },
      });
      if (study) return study;
    } catch {}
    throw new NotFoundException('Study not found.');
  }

  // update(id: number, updateStudyDto: UpdateStudyDto) {
  //   return `This action updates a #${id} study`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} study`;
  // }
}
