import { Module } from '@nestjs/common';
import { RootModule } from './endpoints/root/root.module';

@Module({
  imports: [RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
