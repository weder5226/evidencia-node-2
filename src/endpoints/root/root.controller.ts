import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class RootController {
  @Get('/')
  @Redirect()
  redirectToDoc() {
    return { url: '/doc' };
  }
}
