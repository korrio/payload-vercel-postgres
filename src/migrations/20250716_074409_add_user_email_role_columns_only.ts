import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "user_logs" ADD COLUMN IF NOT EXISTS "user_email" varchar;
        ALTER TABLE "user_logs" ADD COLUMN IF NOT EXISTS "user_role" varchar;
    `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "user_logs" DROP COLUMN IF EXISTS "user_email";
        ALTER TABLE "user_logs" DROP COLUMN IF EXISTS "user_role";
    `)
}
