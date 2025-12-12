CREATE TABLE "atendimentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(255),
	"status" varchar(20) DEFAULT 'pending'
);
