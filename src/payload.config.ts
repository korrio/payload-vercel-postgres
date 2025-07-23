import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

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
import { Views } from './collections/Views'
import { UserLogs } from './collections/UserLogs'
import { Pages } from './collections/Pages'
import { Contact } from './collections/Contact'

import { 
  franchiseViewsReport,
  categoryViewsReport,
  newFranchisesReport,
  totalFranchisesReport,
  marketViewsReport,
  provinceViewsReport,
  newMarketsReport,
  totalMarketsReport,
  allReportsData
} from './endpoints/reports'
import { trackView } from './endpoints/track-view'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    routes: {
      browseByFolder: '/browse',
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [`./components/BeforeDashboard`],
    },
    meta: {
      titleSuffix: '- Franchise CMS',
    },
  },
  collections: [Users, Media, Banners, Posts, Categories, Markets, Franchises, FranchiseCategories, Views, UserLogs, Pages],
  globals: [Contact],
  endpoints: [
    {
      path: '/reports/franchise-views',
      method: 'get',
      handler: franchiseViewsReport,
    },
    {
      path: '/reports/category-views',
      method: 'get',
      handler: categoryViewsReport,
    },
    {
      path: '/reports/new-franchises',
      method: 'get',
      handler: newFranchisesReport,
    },
    {
      path: '/reports/total-franchises',
      method: 'get',
      handler: totalFranchisesReport,
    },
    {
      path: '/reports/market-views',
      method: 'get',
      handler: marketViewsReport,
    },
    {
      path: '/reports/province-views',
      method: 'get',
      handler: provinceViewsReport,
    },
    {
      path: '/reports/new-markets',
      method: 'get',
      handler: newMarketsReport,
    },
    {
      path: '/reports/total-markets',
      method: 'get',
      handler: totalMarketsReport,
    },
    {
      path: '/reports/all',
      method: 'get',
      handler: allReportsData,
    },
    {
      path: '/track-view',
      method: 'post',
      handler: trackView,
    },
  ],
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
        "https://franchise-frontend-one.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3030",
    ].filter((url): url is string => typeof url === 'string'),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'info@mail.aq1.co',
    defaultFromName: 'Best Franchise Thailand',
    // Any Nodemailer transport can be used
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
    // Skip verification during build process
    skipVerify: process.env.NODE_ENV === 'production' || process.env.SKIP_EMAIL_VERIFY === 'true',
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
