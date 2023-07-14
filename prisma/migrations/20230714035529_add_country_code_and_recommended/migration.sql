/*
  Warnings:

  - The `imagesUrl` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `highlights` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `countryCode` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "imagesUrl",
ADD COLUMN     "imagesUrl" TEXT[],
DROP COLUMN "highlights",
ADD COLUMN     "highlights" TEXT[];
