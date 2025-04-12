import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  private readonly logger = new Logger('DatabaseService');

  constructor() {
    super({
      log: [{ level: 'query', emit: 'event' }],
    });
  }

  async onModuleInit() {
    this.$on('query', (e) => {
      this.logger.debug(`[QUERY] ${e.query}`);
    });
    await this.$connect();
    this.logger.log('Database connected');
  }
}
