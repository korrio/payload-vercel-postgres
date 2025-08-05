import { homePageData } from '../seed/home-page-data'

export const seedHomePage = async (req: any) => {
  try {
    console.log('🌱 Starting home page seeding...')
    
    // Try to update only the specific fields we want to change
    const updatedPage = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        title: homePageData.title,
        excerpt: homePageData.excerpt,
        content: homePageData.content,
      },
      req,
    })
    
    console.log(`✅ Updated home page with ID: ${updatedPage.id}`)
    
    return Response.json({
      success: true,
      message: 'Home page updated successfully!',
      pageId: updatedPage.id
    }, { status: 200 })

  } catch (error) {
    console.error('❌ Error seeding home page:', error)
    return Response.json({
      success: false,
      error: 'Failed to seed home page',
      details: (error as Error).message
    }, { status: 500 })
  }
}