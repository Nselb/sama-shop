import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiSuccess, ProductDto } from '@sama-shop/common';
import { PrismaService } from '@sama-shop/prisma';
import { toProductDto, toProductDtoArray } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: PrismaService) {}

  async findAll(): Promise<ApiSuccess<ProductDto[]>> {
    const products = await this.databaseService.product.findMany({
      include: {
        productVariants: true,
      },
    });
    if (products.length === 0) {
      throw new NotFoundException('No products were found');
    }
    const data = toProductDtoArray(products);
    return { data, success: true };
  }

  async findBySlug(slug: string): Promise<ApiSuccess<ProductDto>> {
    const product = await this.databaseService.product.findUnique({
      where: { slug },
      include: {
        productVariants: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }
    const data = toProductDto(product, true);
    return { data, success: true };
  }
}
