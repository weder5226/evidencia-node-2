import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

type ExObj = {
  message: string | Array<string>;
  error: string;
  statusCode: number;
};
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const request = ctx.getRequest<Request>();
    const title = HttpStatus[status].replaceAll('_', ' ');
    const detail =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : (exception.getResponse() as ExObj).message;

    response.status(status).send({
      title,
      status,
      detail,
      instance: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
