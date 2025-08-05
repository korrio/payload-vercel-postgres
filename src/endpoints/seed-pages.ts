import { expandBranchesPageData } from '../seed/expand-branches-data'
import { complaintPageData } from '../seed/complaint-data'

export const seedPages = async (req: any) => {
  try {
    console.log('🌱 Starting page seeding...')
    
    const results = []
    
    // Seed expand-branches page
    const existingExpandBranchesPage = await req.payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'expand-branches',
        },
      },
      limit: 1,
    })

    if (existingExpandBranchesPage.docs.length === 0) {
      const expandBranchesPage = await req.payload.create({
        collection: 'pages',
        data: expandBranchesPageData,
        req,
      })
      results.push(`✅ Created expand-branches page with ID: ${expandBranchesPage.id}`)
      console.log(`✅ Created expand-branches page with ID: ${expandBranchesPage.id}`)
    } else {
      results.push(`ℹ️ Expand-branches page already exists`)
      console.log(`ℹ️ Expand-branches page already exists`)
    }

    // Seed complaint page
    const existingComplaintPage = await req.payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'complaint',
        },
      },
      limit: 1,
    })

    if (existingComplaintPage.docs.length === 0) {
      const complaintPage = await req.payload.create({
        collection: 'pages',
        data: complaintPageData,
        req,
      })
      results.push(`✅ Created complaint page with ID: ${complaintPage.id}`)
      console.log(`✅ Created complaint page with ID: ${complaintPage.id}`)
    } else {
      results.push(`ℹ️ Complaint page already exists`)
      console.log(`ℹ️ Complaint page already exists`)
    }

    console.log('✅ Page seeding completed successfully!')
    
    return Response.json({
      success: true,
      message: 'Page seeding completed successfully!',
      results
    }, { status: 200 })

  } catch (error) {
    console.error('❌ Error seeding pages:', error)
    return Response.json({
      success: false,
      error: 'Failed to seed pages',
      details: (error as Error).message
    }, { status: 500 })
  }
}