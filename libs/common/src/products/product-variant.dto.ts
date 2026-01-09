export interface ProductVariantDto {
  name: string;
  priceModifier: number;
  priceModifierOperator: 'ADD' | 'SUBTRACT' | 'PERCENTAGE_ADD' | 'PERCENTAGE_SUBTRACT';
  images: string[];
  colorCode?: string;
}
