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
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study) private studiesRepository: Repository<Study>,
    private patientsService: PatientsService,
    private wavesService: WavesService,
    private httpService: HttpService,
  ) {}

  // Rename and delete columns
  private renameColumns(row: any, old_name: any, new_name: any): any {
    row[new_name] = row[old_name];
    delete row[old_name];
    return row;
  }

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
      
      const stream = Readable.from(file[0].buffer.toString());

      await new Promise<void>((resolve, reject) => {
        fastcsv
          .parseStream(stream, { headers: true })
          .on('data', async (row: any) => {
            delete row.Epoch;
            delete row['Event Id'];
            delete row['Event Date'];
            delete row['Event Duration'];
            row = this.renameColumns(row, 'Time:256Hz', 'time');
            row = this.renameColumns(row, 'Channel 1', 'channel1');
            row = this.renameColumns(row, 'Channel 2', 'channel2');
            row = this.renameColumns(row, 'Channel 3', 'channel3');
            row = this.renameColumns(row, 'Channel 4', 'channel4');
            row = this.renameColumns(row, 'Channel 5', 'channel5');
            row = this.renameColumns(row, 'Channel 6', 'channel6');
            row = this.renameColumns(row, 'Channel 7', 'channel7');
            row = this.renameColumns(row, 'Channel 8', 'channel8');
            row = this.renameColumns(row, 'Channel 9', 'channel9');
            row = this.renameColumns(row, 'Channel 10', 'channel10');
            row = this.renameColumns(row, 'Channel 11', 'channel11');
            row = this.renameColumns(row, 'Channel 12', 'channel12');
            row = this.renameColumns(row, 'Channel 13', 'channel13');
            row = this.renameColumns(row, 'Channel 14', 'channel14');

            // Check if row is empty
            if (Object.keys(row).length === 0) return;
            // Add study id to row
            row.study = study;

            // Add wave type to row
            row.type = key;

            // Add Wave in the database
            await this.wavesService.create(row as CreateWaveDto);
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

    // Send a post request to the ML API
    await firstValueFrom(this.httpService.post('http://127.0.0.1:3002/api/waves', {study_id: study.id}));

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
        createdOn: 'DESC'
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
          waves: true
        }
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
