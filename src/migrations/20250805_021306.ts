import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_text_section_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_text_section_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_contact_forms_inquiry_type" AS ENUM('general', 'franchise', 'market', 'support', 'partnership', 'complaint', 'other');
  CREATE TYPE "public"."enum_contact_forms_status" AS ENUM('new', 'in-progress', 'resolved', 'closed');
  CREATE TYPE "public"."enum_contact_forms_priority" AS ENUM('low', 'normal', 'high', 'urgent');
  CREATE TYPE "public"."enum_contact_forms_response_template" AS ENUM('standard-thank-you', 'franchise-info', 'market-info', 'tech-support', 'custom');
  ALTER TYPE "public"."enum_pages_page_type" ADD VALUE 'article-page' BEFORE 'complaint-page';
  ALTER TYPE "public"."enum_pages_page_type" ADD VALUE 'expand-branches-page';
  ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE 'article-page' BEFORE 'complaint-page';
  ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE 'expand-branches-page';
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"pricing" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"background_color" varchar DEFAULT '#1A2380',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"text_align" "enum_pages_blocks_text_section_text_align" DEFAULT 'center',
  	"background_color" varchar DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_color" varchar DEFAULT '#1A2380',
  	"text_color" varchar DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_packages_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_packages_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"badge" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"cta_button_color" varchar DEFAULT '#1A2380',
  	"contact_info" varchar,
  	"is_visible" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_pricing_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_color" varchar DEFAULT '#f7f7f7',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"pricing" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"background_color" varchar DEFAULT '#1A2380',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"text_align" "enum__pages_v_blocks_text_section_text_align" DEFAULT 'center',
  	"background_color" varchar DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_color" varchar DEFAULT '#1A2380',
  	"text_color" varchar DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_packages_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_packages_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"badge" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"cta_button_color" varchar DEFAULT '#1A2380',
  	"contact_info" varchar,
  	"is_visible" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_color" varchar DEFAULT '#f7f7f7',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"inquiry_type" "enum_contact_forms_inquiry_type" DEFAULT 'general',
  	"status" "enum_contact_forms_status" DEFAULT 'new',
  	"priority" "enum_contact_forms_priority" DEFAULT 'normal',
  	"source" varchar DEFAULT 'website',
  	"ip_address" varchar,
  	"user_agent" varchar,
  	"assigned_to_id" integer,
  	"internal_notes" varchar,
  	"response_template" "enum_contact_forms_response_template",
  	"email_sent" boolean DEFAULT false,
  	"auto_responded" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages" ALTER COLUMN "content" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_content" SET DATA TYPE varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_forms_id" integer;
  ALTER TABLE "contact" ADD COLUMN "additional_info_maintenance_mode" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section" ADD CONSTRAINT "pages_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_packages_packages_features" ADD CONSTRAINT "pages_blocks_pricing_packages_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_packages_packages" ADD CONSTRAINT "pages_blocks_pricing_packages_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_packages" ADD CONSTRAINT "pages_blocks_pricing_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_section" ADD CONSTRAINT "_pages_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_packages_packages_features" ADD CONSTRAINT "_pages_v_blocks_pricing_packages_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_packages_packages" ADD CONSTRAINT "_pages_v_blocks_pricing_packages_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_packages" ADD CONSTRAINT "_pages_v_blocks_pricing_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_forms" ADD CONSTRAINT "contact_forms_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_section_order_idx" ON "pages_blocks_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_parent_id_idx" ON "pages_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_path_idx" ON "pages_blocks_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_cards_cards_order_idx" ON "pages_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_cards_parent_id_idx" ON "pages_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_image_idx" ON "pages_blocks_service_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_packages_packages_features_order_idx" ON "pages_blocks_pricing_packages_packages_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_packages_packages_features_parent_id_idx" ON "pages_blocks_pricing_packages_packages_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_packages_packages_order_idx" ON "pages_blocks_pricing_packages_packages" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_packages_packages_parent_id_idx" ON "pages_blocks_pricing_packages_packages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_packages_order_idx" ON "pages_blocks_pricing_packages" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_packages_parent_id_idx" ON "pages_blocks_pricing_packages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_packages_path_idx" ON "pages_blocks_pricing_packages" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_section_order_idx" ON "_pages_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_section_parent_id_idx" ON "_pages_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_section_path_idx" ON "_pages_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_order_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_parent_id_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_image_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_service_cards_order_idx" ON "_pages_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_parent_id_idx" ON "_pages_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_path_idx" ON "_pages_v_blocks_service_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_packages_packages_features_order_idx" ON "_pages_v_blocks_pricing_packages_packages_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_packages_packages_features_parent_id_idx" ON "_pages_v_blocks_pricing_packages_packages_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_packages_packages_order_idx" ON "_pages_v_blocks_pricing_packages_packages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_packages_packages_parent_id_idx" ON "_pages_v_blocks_pricing_packages_packages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_packages_order_idx" ON "_pages_v_blocks_pricing_packages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_packages_parent_id_idx" ON "_pages_v_blocks_pricing_packages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_packages_path_idx" ON "_pages_v_blocks_pricing_packages" USING btree ("_path");
  CREATE INDEX "contact_forms_assigned_to_idx" ON "contact_forms" USING btree ("assigned_to_id");
  CREATE INDEX "contact_forms_updated_at_idx" ON "contact_forms" USING btree ("updated_at");
  CREATE INDEX "contact_forms_created_at_idx" ON "contact_forms" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_forms_fk" FOREIGN KEY ("contact_forms_id") REFERENCES "public"."contact_forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_forms_id");
  ALTER TABLE "posts" DROP COLUMN "content_html";
  ALTER TABLE "posts" DROP COLUMN "content_textarea";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content_html";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content_textarea";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_packages_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_packages_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_packages_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_packages_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_forms" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_text_section" CASCADE;
  DROP TABLE "pages_blocks_service_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_packages_packages_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_packages_packages" CASCADE;
  DROP TABLE "pages_blocks_pricing_packages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_text_section" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_packages_packages_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_packages_packages" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_packages" CASCADE;
  DROP TABLE "contact_forms" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_forms_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_type";
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('homepage', 'franchise-page', 'market-page', 'complaint-page', 'contact-page');
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE "public"."enum_pages_page_type" USING "page_type"::"public"."enum_pages_page_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_page_type";
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('homepage', 'franchise-page', 'market-page', 'complaint-page', 'contact-page');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE "public"."enum__pages_v_version_page_type" USING "version_page_type"::"public"."enum__pages_v_version_page_type";
  DROP INDEX "payload_locked_documents_rels_contact_forms_id_idx";
  ALTER TABLE "pages" ALTER COLUMN "content" SET DATA TYPE jsonb;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_content" SET DATA TYPE jsonb;
  ALTER TABLE "posts" ADD COLUMN "content_html" jsonb;
  ALTER TABLE "posts" ADD COLUMN "content_textarea" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content_html" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content_textarea" jsonb;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_forms_id";
  ALTER TABLE "contact" DROP COLUMN "additional_info_maintenance_mode";
  DROP TYPE "public"."enum_pages_blocks_text_section_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_text_section_text_align";
  DROP TYPE "public"."enum_contact_forms_inquiry_type";
  DROP TYPE "public"."enum_contact_forms_status";
  DROP TYPE "public"."enum_contact_forms_priority";
  DROP TYPE "public"."enum_contact_forms_response_template";`)
}
