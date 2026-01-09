import { Prisma, Product } from '../../generated/prisma/client';

export type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { productVariants: true };
}>;

export function isProductWithVariants(
  product: Product | ProductWithVariants,
): product is ProductWithVariants {
  return Array.isArray((product as ProductWithVariants).productVariants);
}
