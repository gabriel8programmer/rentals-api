/*
  Warnings:

  - You are about to drop the column `socialLogin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "socialLogin",
ADD COLUMN     "socialLogged" BOOLEAN NOT NULL DEFAULT false;
