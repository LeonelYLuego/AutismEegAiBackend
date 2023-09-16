import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpResponse } from '../dto/http-response.dto';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: HttpResponse<void> = {
      error: {
        status: httpStatus,
        timestamp: new Date().toISOString(),
        exception,
      },
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, 200);
  }
}
