import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import * as fastcsv from 'fast-csv';
import { Study } from './entities/study.entity';
import { PatientsService } from '@patients/patients.service';
import { Patient } from '@patients/entities/patient.entity';
import { CreateWaveDto } from '@waves/dto/create-wave.dto';
import { WavesService } from '@waves/waves.service';


@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study) private studiesRepository: Repository<Study>,
    private patientsService: PatientsService,
    private wavesService: WavesService,
  ) {}

  async getWavesFromCsv(
    csv: Express.Multer.File, 
    study: Study,
    ): Promise<CreateWaveDto[]> {
    const stream = Readable.from(csv.buffer.toString());
    const data = [];
    
    await new Promise((resolve, reject) => {
      fastcsv
        .parseStream(stream, { headers: true })
        .on('data', (row) => {
          // Check if row is empty
          if (Object.keys(row).length === 0) return;
          // Parse all colum names to lowercase 
          Object.keys(row).forEach(function(key) {
            row[key.toLowerCase()] = row[key];
            delete row[key];
          });
          // Add study id to row
          row.study = study;
          // Parse the row to a wave dto
          const wave = new CreateWaveDto();
          Object.assign(wave, row);
          // Add the wave to the data array
          data.push(wave);
        })
        .on('error', error => reject(error))
        .on('end', () => resolve(data));
    });

    return data;
  }

  async create(patient_id: string, csv: Express.Multer.File): Promise<Study> {
    const patient = await this.patientsService.findOne(patient_id);
    const study = await this.studiesRepository.save({
      patient,
    });

    // Get data from csv
    const data = await this.getWavesFromCsv(csv, study);

    // Create the waves for the study
    const waves = await this.wavesService.create(data);
    
    const retStudy = await this.findOne(study.id);
    // Add the waves to the study
    retStudy.waves = waves;

    return retStudy;
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
