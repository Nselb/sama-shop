import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@sama-shop/prisma';
import { ProductsModule } from '../modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/backend/.env', '.env'],
    }),
    ProductsModule,
    PrismaModule,
  ],
})
export class AppModule {}
