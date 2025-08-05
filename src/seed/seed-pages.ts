// This file has been disabled as the data has already been seeded
// The seeding functionality remains available via the API endpoint at /api/seed-pages

/*
import payload from 'payload'
import { expandBranchesPageData } from './expand-branches-data'
import { complaintPageData } from './complaint-data'

export const seedPages = async () => {
  console.log('Starting page seeding...')

  try {
    // Check if expand-branches page already exists
    const existingExpandBranches = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'expand-branches'
        }
      }
    })

    if (existingExpandBranches.docs.length === 0) {
      const expandBranchesPage = await payload.create({
        collection: 'pages',
        data: expandBranchesPageData
      })
      console.log('✅ Created expand-branches page:', expandBranchesPage.id)
    } else {
      console.log('ℹ️  Expand-branches page already exists, skipping...')
    }

    // Check if complaint page already exists
    const existingComplaint = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'complaint'
        }
      }
    })

    if (existingComplaint.docs.length === 0) {
      const complaintPage = await payload.create({
        collection: 'pages',
        data: complaintPageData
      })
      console.log('✅ Created complaint page:', complaintPage.id)
    } else {
      console.log('ℹ️  Complaint page already exists, skipping...')
    }

    console.log('🎉 Page seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding pages:', error)
    throw error
  }
}

// If this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const { config } = await import('dotenv')
  config({ path: '.env' })
  
  const start = async () => {
    try {
      const payloadConfig = await import('../payload.config.js')
      
      await payload.init({
        secret: process.env.PAYLOAD_SECRET || '',
        config: payloadConfig.default,
        local: true
      })
      
      await seedPages()
      process.exit(0)
    } catch (error) {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    }
  }
  
  start()
}
*/