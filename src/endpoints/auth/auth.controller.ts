import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register on the platform to log in' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() credentialsDto: CredentialsAuthDto) {
    return await this.authService.register(credentialsDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in with your credentials' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentialsDto: CredentialsAuthDto) {
    return await this.authService.login(credentialsDto);
  }
}
