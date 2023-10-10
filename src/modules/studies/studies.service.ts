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
    files: {
      alfa: Express.Multer.File;
      beta: Express.Multer.File;
      gamma: Express.Multer.File;
      delta: Express.Multer.File;
      theta: Express.Multer.File;
    },
    study: Study,
  ): Promise<void> {

    // Iterate over files
    for (const [key, file] of Object.entries(files)) {
      // Get wave type from key
      const waveType = key as keyof typeof files;
      const stream = Readable.from(files[waveType].buffer.toString());

      await new Promise<void>((resolve, reject) => {

        fastcsv
          .parseStream(stream, { headers: true })
          .on('data', async (row: any) => {
            console.log(row);
            // Delete Epoch, Event Id, Event Date, Event Duration columns
            delete row.epoch;
            delete row.event_id;
            delete row.event_date;
            delete row.event_duration;

            // Check if row is empty
            if (Object.keys(row).length === 0) return;
            // Parse all colum names to lowercase
            Object.keys(row).forEach(function (key) {
              row[key.toLowerCase()] = row[key];
              delete row[key];
            });
            // Add study id to row
            row.study = study;

            // Add wave type to row
            row.type = waveType;

            // Add Wave in the database
            // await this.wavesService.create(row as CreateWaveDto);
          })
          .on('error', (error) => reject(error))
          .on('end', () => {
            resolve();
          });
      });
    }
  }

  async create(
    patient_id: string, 
    files: {
      alfa: Express.Multer.File;
      beta: Express.Multer.File;
      gamma: Express.Multer.File;
      delta: Express.Multer.File;
      theta: Express.Multer.File;
    }
  ): Promise<Study> {
    const patient = await this.patientsService.findOne(patient_id);
    const study = await this.studiesRepository.save({
      patient,
    });

    // Get data from files
    await this.saveWaves(files, study);

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
        created_on: 'DESC'
      }
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

  async remove(id: string, patient_id: string): Promise<string> {
    try{
      const study = await this.findOne(id, patient_id);
      if(study) console.log("Study found", study.id);
      await this.studiesRepository.delete(study.id);
      return "Study deleted successfully."
    } catch(error){
      console.log(error);
    }
    throw new NotFoundException('Error deleting study.');
  }
}
