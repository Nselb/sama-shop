import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse, ProductDto } from '@sama-shop/common';
import { PrismaService } from '@sama-shop/prisma';
import { toProductDtoArray } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: PrismaService) {}

  async findAll(): Promise<ApiResponse<ProductDto[]>> {
    const products = await this.databaseService.product.findMany();
    if (!products) {
      throw new NotFoundException('No products were found');
    }
    const data = toProductDtoArray(products);
    return { data, success: true };
  }
}
