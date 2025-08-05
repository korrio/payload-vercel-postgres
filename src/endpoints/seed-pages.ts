// import { expandBranchesPageData } from '../seed/expand-branches-data'
// import { complaintPageData } from '../seed/complaint-data'

export const seedPages = async (req: any) => {
  try {
    console.log('Page seeding temporarily disabled during build fixes')
    
    return Response.json({
      success: false,
      message: 'Page seeding temporarily disabled during build fixes',
      results: []
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