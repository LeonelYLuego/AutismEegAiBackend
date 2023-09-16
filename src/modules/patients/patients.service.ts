import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientsRepository.save(createPatientDto);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientsRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    try {
      const patient = await this.patientsRepository.findOne({
        where: {
          id,
        },
      });
      if (patient) return patient;
    } catch {}
    throw new NotFoundException('Patient not found.');
  }

  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} patient`;
  // }
}
