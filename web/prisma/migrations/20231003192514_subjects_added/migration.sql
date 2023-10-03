/*
  Warnings:

  - The values [ADMIN,USER,MENTOR] on the enum `Subjects` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Subjects_new" AS ENUM ('ITC701', 'ITC702', 'ITL701', 'ITL702', 'ITL703', 'ITL704', 'ITP701', 'CSC701', 'CSC702', 'CSL701', 'CSL702', 'CSL703', 'CSL704', 'CSP701', 'MECC701', 'MECC702', 'MECL701', 'MECL702', 'MECL703', 'MECL704', 'MECP701');
ALTER TABLE "Class" ALTER COLUMN "subject" TYPE "Subjects_new" USING ("subject"::text::"Subjects_new");
ALTER TYPE "Subjects" RENAME TO "Subjects_old";
ALTER TYPE "Subjects_new" RENAME TO "Subjects";
DROP TYPE "Subjects_old";
COMMIT;
