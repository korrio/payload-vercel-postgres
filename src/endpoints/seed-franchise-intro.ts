import { franchisesIntroPageData } from '../seed/franchises-intro-data'

export const seedFranchiseIntroPage = async (req: any) => {
  try {
    console.log('🌱 Starting franchise intro page seeding...')
    
    // Check if page with ID 6 exists
    const existingPage = await req.payload.findByID({
      collection: 'pages',
      id: 6,
    }).catch(() => null)

    if (!existingPage) {
      // Create the page with specific ID 6
      const page = await req.payload.create({
        collection: 'pages',
        data: {
          id: 6,
          ...franchisesIntroPageData
        },
        req,
      })
      
      console.log(`✅ Created franchise intro page with ID: ${page.id}`)
      
      return Response.json({
        success: true,
        message: 'Franchise intro page seeded successfully!',
        pageId: page.id
      }, { status: 200 })
    } else {
      console.log(`ℹ️ Franchise intro page already exists with ID: 6`)
      
      return Response.json({
        success: true,
        message: 'Franchise intro page already exists',
        pageId: 6
      }, { status: 200 })
    }

  } catch (error) {
    console.error('❌ Error seeding franchise intro page:', error)
    return Response.json({
      success: false,
      error: 'Failed to seed franchise intro page',
      details: (error as Error).message
    }, { status: 500 })
  }
}