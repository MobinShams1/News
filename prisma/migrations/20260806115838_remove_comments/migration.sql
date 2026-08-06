/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `coverImage` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [Comment_articleId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [Comment_userId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Category] DROP CONSTRAINT [Category_name_key];

-- AlterTable
ALTER TABLE [dbo].[Article] DROP CONSTRAINT [Article_status_df];
ALTER TABLE [dbo].[Article] ALTER COLUMN [content] NTEXT NOT NULL;
ALTER TABLE [dbo].[Article] ALTER COLUMN [coverImage] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Article] ADD CONSTRAINT [Article_status_df] DEFAULT 'PUBLISHED' FOR [status];

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_role_df];
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_role_df] DEFAULT 'ADMIN' FOR [role];

-- DropTable
DROP TABLE [dbo].[Comment];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
