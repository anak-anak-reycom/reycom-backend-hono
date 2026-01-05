/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "name_admin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name_category" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careers" (
    "id" SERIAL NOT NULL,
    "job_name" TEXT NOT NULL,
    "job_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applys" (
    "id" SERIAL NOT NULL,
    "name_apply" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "domicile" TEXT NOT NULL,
    "resume" TEXT NOT NULL,

    CONSTRAINT "applys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "branch" TEXT NOT NULL,
    "branch_per_country" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applys_email_key" ON "applys"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- AddForeignKey
ALTER TABLE "careers" ADD CONSTRAINT "careers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
