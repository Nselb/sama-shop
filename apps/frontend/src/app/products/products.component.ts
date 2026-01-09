import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto, ProductVariantDto } from '@sama-shop/common';
import { ProductsService } from '../../core/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  protected productsService = inject(ProductsService);

  // Map to track which variant is being hovered for each product
  private hoveredVariantMap = new Map<string, ProductVariantDto | null>();

  get products(): ProductDto[] {
    return this.productsService.products()?.data || [];
  }

  getCurrentImage(product: ProductDto): string | null {
    const hoveredVariant = this.hoveredVariantMap.get(product.id);
    
    if (hoveredVariant?.images && hoveredVariant.images.length > 0) {
      return hoveredVariant.images[0];
    }
    
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    
    return null;
  }

  onVariantMouseEnter(productId: string, variant: ProductVariantDto) {
    this.hoveredVariantMap.set(productId, variant);
  }

  onVariantMouseLeave(productId: string) {
    this.hoveredVariantMap.set(productId, null);
  }
}
