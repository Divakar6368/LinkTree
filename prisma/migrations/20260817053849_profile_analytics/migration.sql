-- CreateTable
CREATE TABLE "LinkAnalytics" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL,
    "clickerIp" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileAnalytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorIp" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LinkAnalytics_clickedAt_linkId_idx" ON "LinkAnalytics"("clickedAt", "linkId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkAnalytics_linkId_clickerIp_clickedAt_key" ON "LinkAnalytics"("linkId", "clickerIp", "clickedAt");

-- CreateIndex
CREATE INDEX "ProfileAnalytics_visitedAt_userId_idx" ON "ProfileAnalytics"("visitedAt", "userId");

-- AddForeignKey
ALTER TABLE "LinkAnalytics" ADD CONSTRAINT "LinkAnalytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAnalytics" ADD CONSTRAINT "ProfileAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
