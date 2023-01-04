/*
  Warnings:

  - Added the required column `nickName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImageUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountNumber" VARCHAR(100),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dealCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nickName" VARCHAR(100) NOT NULL,
ADD COLUMN     "openChatUrl" VARCHAR(100),
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" VARCHAR(100),
ADD COLUMN     "profileImageUrl" TEXT NOT NULL,
ADD COLUMN     "purchaseCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "purchaseMoney" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "saleCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "saleMoney" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "socialId" VARCHAR(100) NOT NULL,
ADD COLUMN     "twitterMessageUrl" VARCHAR(100),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
