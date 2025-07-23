import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "markets" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "markets" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "franchises" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "franchises" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "franchises" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "markets" ADD CONSTRAINT "markets_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "franchises" ADD CONSTRAINT "franchises_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "markets_meta_meta_image_idx" ON "markets" USING btree ("meta_image_id");
  CREATE INDEX "franchises_meta_meta_image_idx" ON "franchises" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "markets" DROP CONSTRAINT "markets_meta_image_id_media_id_fk";
  
  ALTER TABLE "franchises" DROP CONSTRAINT "franchises_meta_image_id_media_id_fk";
  
  DROP INDEX "markets_meta_meta_image_idx";
  DROP INDEX "franchises_meta_meta_image_idx";
  ALTER TABLE "markets" DROP COLUMN "meta_title";
  ALTER TABLE "markets" DROP COLUMN "meta_image_id";
  ALTER TABLE "franchises" DROP COLUMN "meta_title";
  ALTER TABLE "franchises" DROP COLUMN "meta_image_id";
  ALTER TABLE "franchises" DROP COLUMN "meta_description";`)
}
