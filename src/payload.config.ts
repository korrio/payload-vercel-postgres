import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Banners } from './collections/Banners'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'

import { Markets } from './collections/Markets'
import { Franchises } from './collections/Franchises'
import { FranchiseCategories } from './collections/FranchiseCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard', '@/components/SummaryDashboard'],
    },
  },
  collections: [Users, Media, Banners, Posts, Categories, Markets, Franchises, FranchiseCategories],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
        "https://franchise-frontend-prod.vercel.app",
        "https://bestfranchisethailand.com",
        "http://localhost:3000",
        "http://localhost:3030",
    ].filter((url): url is string => typeof url === 'string'),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // plugins: [
  //   vercelBlobStorage({
  //     collections: {
  //       media: true,
  //     },
  //     token: process.env.BLOB_READ_WRITE_TOKEN || '',
  //   }),
  // ],
})
