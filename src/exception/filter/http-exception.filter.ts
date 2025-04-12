import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const detail = exception.message;
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
