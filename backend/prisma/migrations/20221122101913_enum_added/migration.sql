-- CreateEnum
CREATE TYPE "Notification" AS ENUM ('NONE', 'DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "notification" "Notification" NOT NULL DEFAULT 'NONE';
