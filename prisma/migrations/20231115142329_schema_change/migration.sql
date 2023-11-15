/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
DROP TABLE "Menu" CASCADE

