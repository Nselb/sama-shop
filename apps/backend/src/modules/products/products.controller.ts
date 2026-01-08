import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ProductDto } from '@sama-shop/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ApiResponse<ProductDto[]>> {
    return this.productsService.findAll();
  }
}
