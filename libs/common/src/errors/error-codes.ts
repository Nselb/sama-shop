export const ErrorCode = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  PRODUCTS_NOT_FOUND: 'PRODUCTS_NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
