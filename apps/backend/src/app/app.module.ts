import { Module } from '@nestjs/common';
import { ProductsModule } from '../modules/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
