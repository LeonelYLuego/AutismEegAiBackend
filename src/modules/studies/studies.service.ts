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

  private async saveWaves(
    csv: Express.Multer.File,
    study: Study,
  ): Promise<void> {
    const stream = Readable.from(csv.buffer.toString());

    await new Promise<void>((resolve, reject) => {
      let time: number = 0;

      fastcsv
        .parseStream(stream, { headers: true })
        .on('data', async (row: any) => {
          // Check if row is empty
          if (Object.keys(row).length === 0) return;
          // // Parse all colum names to lowercase
          Object.keys(row).forEach(function (key) {
            row[key.toLowerCase()] = row[key];
            delete row[key];
          });
          // Add study id to row
          row.study = study;

          // Add time to row
          row.time = time;

          // Add 1/16 to time
          time += 0.0625;

          // Add Wave in the database
          await this.wavesService.create(row as CreateWaveDto);
        })
        .on('error', (error) => reject(error))
        .on('end', () => {
          resolve();
        });
    });
  }

  async create(patient_id: string, csv: Express.Multer.File): Promise<Study> {
    const patient = await this.patientsService.findOne(patient_id);
    const study = await this.studiesRepository.save({
      patient,
    });

    // Get data from csv
    await this.saveWaves(csv, study);

    // return retStudy;
    return await this.findOne(study.id);
  }

  async findAll(patient_id: string): Promise<Study[]> {
    const patient = await this.patientsService.findOne(patient_id);
    return await this.studiesRepository.find({
      where: {
        patient,
      },
      order: {
        created_on: 'DESC',
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
        relations: {
          waves: true,
        },
      });
      if (study) return study;
    } catch {}
    throw new NotFoundException('Study not found.');
  }

  async remove(id: string, patient_id: string): Promise<void> {
    await this.findOne(id, patient_id);
    try {
      await this.studiesRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Study not deleted.');
    }
  }
}
