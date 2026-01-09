import { ProductDto } from '@sama-shop/common';
import {
  isProductWithVariants,
  Product,
  ProductWithVariants,
} from '@sama-shop/prisma';

function mapProductToDto(
  product: Product | ProductWithVariants,
  showLongDescription = false,
): ProductDto {
  const baseDto: ProductDto = {
    id: product.id,
    images: product.images,
    name: product.name,
    description: showLongDescription
      ? product.longDescription
      : product.shortDescription,
    basePrice: product.basePrice.toNumber(),
    slug: product.slug,
  };

  if (isProductWithVariants(product)) {
    baseDto.variants = product.productVariants.map((variant) => ({
      name: variant.name,
      priceModifier: variant.priceModifier.toNumber(),
      priceModifierOperator: variant.priceModifierOperator,
      images: variant.images,
      colorCode: variant.colorCode ?? undefined,
    }));
  }

  return baseDto;
}

export function toProductDto(
  p: Product | ProductWithVariants,
  showLongDescription = false,
): ProductDto {
  return mapProductToDto(p, showLongDescription);
}

export function toProductDtoArray(
  p: Product[] | ProductWithVariants[],
  showLongDescription = false,
): ProductDto[] {
  return p.map((product: Product | ProductWithVariants) =>
    mapProductToDto(product, showLongDescription),
  );
}
