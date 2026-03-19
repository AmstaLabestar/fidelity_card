ALTER TABLE "User"
ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmContent" TEXT,
ADD COLUMN "utmTerm" TEXT,
ADD COLUMN "fbclid" TEXT;

ALTER TABLE "Preorder"
ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmContent" TEXT,
ADD COLUMN "utmTerm" TEXT,
ADD COLUMN "fbclid" TEXT;

CREATE INDEX "User_utmSource_idx" ON "User"("utmSource");
CREATE INDEX "User_utmCampaign_idx" ON "User"("utmCampaign");
CREATE INDEX "Preorder_utmSource_idx" ON "Preorder"("utmSource");
CREATE INDEX "Preorder_utmCampaign_idx" ON "Preorder"("utmCampaign");
