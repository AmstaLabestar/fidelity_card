-- CreateEnum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PreorderStatus') THEN
    CREATE TYPE "PreorderStatus" AS ENUM ('pending', 'confirmed', 'delivered');
  END IF;
END
$$;

-- AlterTable
ALTER TABLE "Preorder"
ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "Preorder"
ALTER COLUMN "status" TYPE "PreorderStatus"
USING (
  CASE
    WHEN "status" IN ('pending', 'confirmed', 'delivered') THEN "status"::"PreorderStatus"
    ELSE 'pending'::"PreorderStatus"
  END
);

ALTER TABLE "Preorder"
ALTER COLUMN "status" SET DEFAULT 'pending'::"PreorderStatus";

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Preorder_userId_createdAt_idx" ON "Preorder"("userId", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Preorder_status_idx" ON "Preorder"("status");
