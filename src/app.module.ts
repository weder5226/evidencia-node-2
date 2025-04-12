import { Module } from '@nestjs/common';
import { RootModule } from './endpoints/root/root.module';
import { ProductModule } from './endpoints/product/product.module';
import { DatabaseModule } from './database/database.module';
import { ProductDetailModule } from './endpoints/product-detail/product-detail.module';
import { AuthModule } from './endpoints/auth/auth.module';

@Module({
  imports: [RootModule, ProductModule, DatabaseModule, ProductDetailModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
