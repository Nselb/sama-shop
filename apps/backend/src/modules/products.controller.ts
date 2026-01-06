import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse } from '@sama-shop/common';
import { ProductDto } from '@sama-shop/shared';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ApiResponse<ProductDto[]>> {
    return {
      data: [
        { id: '1', name: 'Producto 1', images: [] },
        { id: '2', name: 'Producto 2', images: [] },
        { id: '3', name: 'Producto 3', images: [] },
        { id: '4', name: 'Producto 4', images: [] },
        { id: '5', name: 'Producto 5', images: [] },
        { id: '6', name: 'Producto 6', images: [] },
      ],
      message: '',
      statusCode: 1,
    };
  }
}
