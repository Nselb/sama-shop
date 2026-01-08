-- CreateEnum
CREATE TYPE "PriceModifierOperator" AS ENUM ('ADD', 'SUBTRACT', 'PERCENTAGE_ADD', 'PERCENTAGE_SUBTRACT');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "images" TEXT[],
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceModifier" DECIMAL(65,30) NOT NULL,
    "priceModifierOperator" "PriceModifierOperator" NOT NULL,
    "images" TEXT[],

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("productId","name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
