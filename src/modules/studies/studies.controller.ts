import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Doc } from '@utils/decorators/doc.decorator';
import { HttpResponse } from '@utils/dto/http-response.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResponseStudyDto } from './dto/response-study.dto';

@ApiTags('Studies')
@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post(':patient_id')
  @ApiConsumes('multipart/form-data')
  @Doc({
    summary: 'Create a `Study`',
    description:
      'Creates a new `Study` in the database for the provided `Patient`',
    errorStatus: ['400', '404'],
    http201: ResponseStudyDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'study', maxCount: 1 },
    ]),
  )
  async create(
    @Param('patient_id') patient_id: string,
    @Body() createStudyDto: CreateStudyDto,
    @UploadedFiles()
    files: {
      study: Express.Multer.File;
    },
  ): Promise<HttpResponse<ResponseStudyDto>> {
    return {
      data: await this.studiesService.create(patient_id, files),
    };
  }

  @Get(':patient_id')
  @Doc({
    summary: 'Find all `Studies`',
    description:
      'Finds in the database all `Studies` of the provided `Patient`',
    errorStatus: ['404'],
    http200: [ResponseStudyDto],
  })
  async findAll(
    @Param('patient_id') patient_id: string,
  ): Promise<ResponseStudyDto[]> {
    return await this.studiesService.findAll(patient_id);
  }

  @Get(':patient_id/:id')
  @Doc({
    summary: 'Find a `Study`',
    description: 'Finds in the database a `Study` or the provided `Patient`',
    errorStatus: ['404'],
    http200: ResponseStudyDto,
  })
  async findOne(
    @Param('patient_id') patient_id: string,
    @Param('id') id: string,
  ): Promise<ResponseStudyDto> {
    return await this.studiesService.findOne(id, patient_id);
  }

  @Delete(':patient_id/:id')
  @Doc({
    summary: 'Delete a `Study`',
    description:
      'Deletes a `Study` from the database based on the provided `id`',
    errorStatus: ['404'],
    http200: String,
  })
  async remove(
    @Param('patient_id') patient_id: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.studiesService.remove(id, patient_id);
  }
}
