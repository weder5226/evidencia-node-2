import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { DuplicateException } from 'src/exception/duplicate.exception';
import { hashEncode, hashMatches } from 'src/util/encoder';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly tokenService: JwtService,
  ) {}

  async register(credentialsDto: CredentialsAuthDto) {
    const { email, password: pwd } = credentialsDto;

    const duplicated = await this.db.supervisor.findUnique({
      where: { email },
      select: { email: true },
    });
    if (duplicated != null) {
      throw new DuplicateException('The email provided is already in use by another user');
    }

    const password = await hashEncode(pwd);
    const user = await this.db.supervisor.create({
      data: {
        name: 'Generic_User',
        email,
        password,
        role: 'ADMIN',
        isEnabled: true,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  }

  async login(credentialsDto: CredentialsAuthDto) {
    const { email, password: pwd } = credentialsDto;
    const user = await this.db.supervisor.findUnique({
      where: { email },
      select: { id: true, name: true, password: true },
    });

    if (user == null) throw new UnauthorizedException('The credentials provided are not valid');

    const isPwddValid = await hashMatches(pwd, user.password);
    if (!isPwddValid) throw new UnauthorizedException('The credentials provided are not valid');

    const payload = { sub: user.id, username: user.name };
    return {
      accessToken: await this.tokenService.signAsync(payload),
    };
  }
}
