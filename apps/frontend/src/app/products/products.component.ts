import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDto } from '@sama-shop/common';
import { ProductsService } from '../../core/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  protected productsService = inject(ProductsService);

  get products(): ProductDto[] {
    return this.productsService.products()?.data || [];
  }
}
