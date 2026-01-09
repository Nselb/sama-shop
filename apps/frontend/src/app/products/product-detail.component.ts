import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDto, ProductVariantDto } from '@sama-shop/common';
import { ProductsService } from '../../core/products/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  product = signal<ProductDto | null>(null);
  selectedVariant = signal<ProductVariantDto | null>(null);

  currentPrice = computed(() => {
    const productData = this.product();
    if (!productData) return 0;

    const variant = this.selectedVariant();
    if (!variant) return productData.basePrice;

    const basePrice = productData.basePrice;
    const modifier = variant.priceModifier;

    switch (variant.priceModifierOperator) {
      case 'ADD':
        return basePrice + modifier;
      case 'SUBTRACT':
        return basePrice - modifier;
      case 'PERCENTAGE_ADD':
        return basePrice * (1 + modifier / 100);
      case 'PERCENTAGE_SUBTRACT':
        return basePrice * (1 - modifier / 100);
      default:
        return basePrice;
    }
  });

  currentImage = computed(() => {
    const productData = this.product();
    if (!productData) return null;

    const variant = this.selectedVariant();
    if (variant?.images && variant.images.length > 0) {
      return variant.images[0];
    }

    if (productData.images && productData.images.length > 0) {
      return productData.images[0];
    }

    return null;
  });

  selectVariant(variant: ProductVariantDto) {
    this.selectedVariant.set(variant);
  }

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.productsService.getProductBySlug(slug).subscribe((response) => {
        if (response?.success && response.data) {
          this.product.set(response.data);
        }
      });
    }
  }
}
