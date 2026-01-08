import { ProductDto } from '@sama-shop/common';
import { Product } from '@sama-shop/prisma';

function mapProductToDto(
  product: Product,
  showLongDescription = false,
): ProductDto {
  return {
    id: product.id,
    images: product.images,
    name: product.name,
    description: showLongDescription
      ? product.longDescription
      : product.shortDescription,
    basePrice: product.basePrice.toNumber(),
    slug: product.slug,
  };
}

export function toProductDto(
  p: Product,
  showLongDescription = false,
): ProductDto {
  return mapProductToDto(p, showLongDescription);
}

export function toProductDtoArray(
  p: Product[],
  showLongDescription = false,
): ProductDto[] {
  return p.map((product) => mapProductToDto(product, showLongDescription));
}
