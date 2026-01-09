import { ProductVariantDto } from './product-variant.dto';

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  images: string[];
  description: string;
  variants?: ProductVariantDto[];
}
