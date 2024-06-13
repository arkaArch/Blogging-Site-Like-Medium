-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "published_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profile_picture" TEXT;
