import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DatabaseService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
}
