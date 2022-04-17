/*
  Warnings:

  - Added the required column `duration` to the `samples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `samples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "samples" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
