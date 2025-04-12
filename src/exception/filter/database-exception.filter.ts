import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from 'generated/prisma/runtime/library';

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.BAD_REQUEST;
    let detail = 'An unexpected database error occurred';
    if (exception instanceof PrismaClientKnownRequestError) {
      detail =
        'The input provided does not match or violates a data constraint. Please review and try again';
    } else if (exception instanceof PrismaClientValidationError) {
      detail =
        'The input provided is invalid or incomplete for the requested operation. Please review and try again';
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      detail = 'An unexpected database error occurred during the operation';
    }
    const title = HttpStatus[status].replaceAll('_', ' ');

    response.status(status).send({
      title,
      status,
      detail,
      instance: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
