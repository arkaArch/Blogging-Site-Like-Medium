/*
  Warnings:

  - Made the column `published_at` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profile_picture` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "published_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "profile_picture" SET NOT NULL;
