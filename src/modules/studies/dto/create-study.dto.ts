import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyDto {
    // Create a api property for multiple csv files
    @ApiProperty({ type: 'string', format: 'binary' })
    alfa: any;
    @ApiProperty({ type: 'string', format: 'binary' })
    beta: any;
    @ApiProperty({ type: 'string', format: 'binary' })
    gamma: any;
    @ApiProperty({ type: 'string', format: 'binary' })
    delta: any;
    @ApiProperty({ type: 'string', format: 'binary' })
    theta: any;
    
}
