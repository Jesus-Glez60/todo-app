-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "estimatedTime" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notification" TEXT,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT true;
