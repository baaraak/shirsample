/*
  Warnings:

  - Added the required column `userId` to the `proposals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "proposals" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
