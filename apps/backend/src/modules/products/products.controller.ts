import { Controller, Get, Param } from '@nestjs/common';
import { ApiSuccess, ProductDto } from '@sama-shop/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ApiSuccess<ProductDto[]>> {
    return this.productsService.findAll();
  }

  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<ApiSuccess<ProductDto>> {
    return this.productsService.findBySlug(slug);
  }
}
