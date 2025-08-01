/*
  Warnings:

  - You are about to drop the column `image` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerDay` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Car` table. All the data in the column will be lost.
  - Added the required column `description` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Car" DROP COLUMN "image",
DROP COLUMN "pricePerDay",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
