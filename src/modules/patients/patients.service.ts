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

  async update(id: string, updatePatientDto: CreatePatientDto) {
    try{
      await this.patientsRepository.update(id, updatePatientDto);
      return await this.findOne(id);
    }
    catch{}
    throw new NotFoundException('Error updating patient.');
  }

  async remove(id: string): Promise<string> {
    try {
      const patient = await this.findOne(id);
      await this.patientsRepository.remove(patient);
      return "Patient deleted successfully."
    } catch {}
    throw new NotFoundException('Error deleting patient.');
  }
}
