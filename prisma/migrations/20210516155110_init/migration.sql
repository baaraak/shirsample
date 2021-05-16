-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(255),
    "genre" TEXT,
    "language" CHAR(2),
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "sampleId" INTEGER NOT NULL,
    "artist_name" VARCHAR(100) NOT NULL,
    "song_title" VARCHAR(100) NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "sampleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Sample" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
