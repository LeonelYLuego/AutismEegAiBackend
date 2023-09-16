import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function Doc(options: {
  summary: string;
  description: string;
  errorStatus: ('400' | '401' | '404')[];
  http200?: any;
  http201?: any;
  bearer?: boolean;
}) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  if (options.http200)
    decorators.push(
      ApiOkResponse({
        type: options.http200,
      }),
    );

  if (options.http201)
    decorators.push(
      ApiCreatedResponse({
        type: options.http201,
      }),
    );

  if (options.errorStatus.find((status) => status == '400'))
    decorators.push(
      ApiBadRequestResponse({
        description: 'Invalid data.',
      }),
    );

  if (options.errorStatus.find((status) => status == '401'))
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'Unauthorized.',
      }),
    );

  if (options.errorStatus.find((status) => status == '404'))
    decorators.push(
      ApiNotFoundResponse({
        description: 'Not found.',
      }),
    );

  if (options.bearer === undefined || options.bearer) {
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'Unauthorized.',
      }),
    );
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}
