-- Simulate Enum using CHECK constraint (SQL Server does not support CREATE TYPE ... AS ENUM)
-- The CHECK constraint will be added to the 'category' column below.

-- DropForeignKey
ALTER TABLE "public"."Meme" DROP CONSTRAINT "Meme_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLikesMeme" DROP CONSTRAINT "UserLikesMeme_memeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLikesMeme" DROP CONSTRAINT "UserLikesMeme_userId_fkey";

-- AlterTable
ALTER TABLE [Meme] ADD [category] VARCHAR(50) NOT NULL DEFAULT 'CLASSIC' 
	CONSTRAINT CHK_Meme_Category CHECK ([category] IN ('CLASSIC', 'DANK', 'WHOLESOME'));

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikesMeme" ADD CONSTRAINT "UserLikesMeme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikesMeme" ADD CONSTRAINT "UserLikesMeme_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
