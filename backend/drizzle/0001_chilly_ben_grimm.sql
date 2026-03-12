ALTER TABLE "atendimentos" RENAME COLUMN "name" TO "tipo";--> statement-breakpoint
ALTER TABLE "atendimentos" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "atendimentos" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "atendimentos" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "atendimentos" DROP COLUMN "description";