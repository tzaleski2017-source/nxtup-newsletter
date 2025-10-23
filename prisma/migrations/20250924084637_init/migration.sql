-- CreateTable
CREATE TABLE "Streamer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "language" TEXT,
    "profileImageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OAuthToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streamerId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OAuthToken_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streamerId" TEXT NOT NULL,
    "followers" INTEGER,
    "subscribers" INTEGER,
    "chatEngagement" INTEGER,
    "viewerCount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Snapshot_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_streamerId_key" ON "OAuthToken"("streamerId");

-- CreateIndex
CREATE INDEX "Snapshot_streamerId_createdAt_idx" ON "Snapshot"("streamerId", "createdAt");
