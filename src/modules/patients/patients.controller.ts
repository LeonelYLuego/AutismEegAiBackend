import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from '@utils/decorators/doc.decorator';
import { Patient } from './entities/patient.entity';
import { HttpResponse } from '@utils/dto/http-response.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Doc({
    summary: 'Create a new `Patient`',
    description: 'Creates a new `Patient` in the database',
    errorStatus: ['400'],
    http201: Patient,
  })
  async create(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<HttpResponse<Patient>> {
    return {
      data: await this.patientsService.create(createPatientDto),
    };
  }

  @Get()
  @Doc({
    summary: 'Find all `Patients`',
    description: 'Finds in the database all `Patients`',
    errorStatus: [],
    http200: [Patient],
  })
  async findAll(): Promise<HttpResponse<Patient[]>> {
    return {
      data: await this.patientsService.findAll(),
    };
  }

  @Get(':id')
  @Doc({
    summary: 'Find a `Patient`',
    description: 'Finds in the database a `Patient` based on the provided `id`',
    errorStatus: ['404'],
    http200: Patient,
  })
  async findOne(@Param('id') id: string): Promise<HttpResponse<Patient>> {
    return {
      data: await this.patientsService.findOne(id),
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
  //   return this.patientsService.update(+id, updatePatientDto);
  // }

  @Delete(':id')
  @Doc({
    summary: 'Delete a `Patient`',
    description: 'Deletes a `Patient` from the database based on the provided `id`',
    errorStatus: ['404'],
    http200: String,
  })
  async remove(@Param('id') id: string): Promise<HttpResponse<string>> {
    return {
      data: await this.patientsService.remove(id),
    };
  }
}
