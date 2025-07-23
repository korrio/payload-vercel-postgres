import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_additional_info_support_languages" AS ENUM('th', 'en', 'zh', 'ja');
  CREATE TABLE "contact_additional_info_support_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_contact_additional_info_support_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_additional_info_departments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_info_company_name" varchar DEFAULT 'บริษัท เฟรนไชน์ จำกัด' NOT NULL,
  	"company_info_address" varchar DEFAULT '2525 อาคารเอฟวายไอ เซ็นเตอร์ อาคาร 2 ชั้น 12 ยูนิต 2/1201-2/1202 ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110' NOT NULL,
  	"company_info_phone" varchar DEFAULT '+66 (02) 001-5855 (เปิดทุกวัน 24 ชั่วโมง)' NOT NULL,
  	"company_info_email" varchar DEFAULT 'cs@franchise.com' NOT NULL,
  	"social_media_line" varchar DEFAULT 'https://shop.line.me/@linehoro',
  	"social_media_facebook" varchar DEFAULT 'https://www.facebook.com/bestfranchisethailand',
  	"social_media_tiktok" varchar DEFAULT 'http://tiktok.com/@bestfranchisethailand',
  	"social_media_instagram" varchar,
  	"social_media_youtube" varchar,
  	"social_media_twitter" varchar,
  	"location_map_embed" varchar DEFAULT '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.96241924154!2d100.55742897548679!3d13.720725098011444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f108d5e48a5%3A0xaeacc1782272b03f!2sFYI%20Center!5e0!3m2!1sen!2sth!4v1753284339552!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  	"location_coordinates_latitude" numeric DEFAULT 13.720725098011444,
  	"location_coordinates_longitude" numeric DEFAULT 100.55742897548679,
  	"location_google_maps_link" varchar,
  	"business_hours_description" varchar DEFAULT 'เปิดทุกวัน 24 ชั่วโมง',
  	"business_hours_weekdays_open" varchar DEFAULT '00:00',
  	"business_hours_weekdays_close" varchar DEFAULT '23:59',
  	"business_hours_weekends_open" varchar DEFAULT '00:00',
  	"business_hours_weekends_close" varchar DEFAULT '23:59',
  	"business_hours_holidays" varchar DEFAULT 'เปิดทุกวัน รวมวันหยุด',
  	"additional_info_contact_form" boolean DEFAULT true,
  	"additional_info_emergency_contact_phone" varchar,
  	"additional_info_emergency_contact_email" varchar,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "contact_additional_info_support_languages" ADD CONSTRAINT "contact_additional_info_support_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_additional_info_departments" ADD CONSTRAINT "contact_additional_info_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_additional_info_support_languages_order_idx" ON "contact_additional_info_support_languages" USING btree ("order");
  CREATE INDEX "contact_additional_info_support_languages_parent_idx" ON "contact_additional_info_support_languages" USING btree ("parent_id");
  CREATE INDEX "contact_additional_info_departments_order_idx" ON "contact_additional_info_departments" USING btree ("_order");
  CREATE INDEX "contact_additional_info_departments_parent_id_idx" ON "contact_additional_info_departments" USING btree ("_parent_id");
  CREATE INDEX "contact_updated_by_idx" ON "contact" USING btree ("updated_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_additional_info_support_languages" CASCADE;
  DROP TABLE "contact_additional_info_departments" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TYPE "public"."enum_contact_additional_info_support_languages";`)
}
