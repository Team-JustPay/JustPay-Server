-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "profileImageUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Pin" (
    "uid" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Board" (
    "uid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Note" (
    "uid" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "BoardPin" (
    "uid" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "pinId" TEXT NOT NULL,

    CONSTRAINT "BoardPin_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "NotePin" (
    "uid" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "pinId" TEXT NOT NULL,

    CONSTRAINT "NotePin_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "UserRelation" (
    "uid" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "UserRelation_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotePin" ADD CONSTRAINT "NotePin_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotePin" ADD CONSTRAINT "NotePin_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
