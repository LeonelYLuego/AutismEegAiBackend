import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from '@utils/decorators/doc.decorator';
import { Study } from './entities/study.entity';
import { HttpResponse } from '@utils/dto/http-response.dto';

@ApiTags('Studies')
@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post(':patient_id')
  @Doc({
    summary: 'Create a `Study`',
    description:
      'Creates a new `Study` in the database for the provided `Patient`',
    errorStatus: ['400', '404'],
    http201: Study,
  })
  async create(
    @Param('patient_id') patient_id: string,
  ): Promise<HttpResponse<Study>> {
    return {
      data: await this.studiesService.create(patient_id),
    };
  }

  @Get(':patient_id')
  @Doc({
    summary: 'Find all `Studies`',
    description:
      'Finds in the database all `Studies` of the provided `Patient`',
    errorStatus: ['404'],
    http200: [Study],
  })
  async findAll(
    @Param('patient_id') patient_id: string,
  ): Promise<HttpResponse<Study[]>> {
    return {
      data: await this.studiesService.findAll(patient_id),
    };
  }

  @Get(':patient_id/:id')
  @Doc({
    summary: 'Find a `Study`',
    description: 'Finds in the database a `Study` or the provided `Patient`',
    errorStatus: ['404'],
    http200: Study,
  })
  async findOne(
    @Param('patient_id') patient_id: string,
    @Param('id') id: string,
  ): Promise<HttpResponse<Study>> {
    return {
      data: await this.studiesService.findOne(id, patient_id),
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
  //   return this.studiesService.update(+id, updateStudyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studiesService.remove(+id);
  // }
}
