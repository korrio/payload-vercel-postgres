import { homePageData } from '../seed/home-page-data'

export const seedHomePage = async (req: any) => {
  try {
    console.log('🌱 Starting home page seeding...')
    
    // Try to update one field at a time to avoid validation issues
    const updatedTitle = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        title: homePageData.title,
      },
      req,
    })
    
    console.log(`✅ Updated home page title: ${updatedTitle.title}`)
    
    // Update excerpt
    const updatedExcerpt = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        excerpt: homePageData.excerpt,
      },
      req,
    })
    
    console.log(`✅ Updated home page excerpt`)
    
    // Update content
    const updatedContent = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        content: homePageData.content,
      },
      req,
    })
    
    console.log(`✅ Updated home page content`)
    
    // Update meta data
    const updatedMeta = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        meta: homePageData.meta,
      },
      req,
    })
    
    console.log(`✅ Updated home page meta data`)
    
    // Update content blocks - this is the key part for CMS integration
    const updatedContentBlocks = await req.payload.update({
      collection: 'pages',
      id: 1,
      data: {
        contentBlocks: homePageData.contentBlocks,
      },
      req,
    })
    
    console.log(`✅ Updated home page content blocks: ${updatedContentBlocks.contentBlocks?.length || 0} blocks`)
    
    return Response.json({
      success: true,
      message: 'Home page updated successfully in steps!',
      pageId: updatedMeta.id,
      updates: {
        title: updatedTitle.title,
        excerpt: !!updatedExcerpt.excerpt,
        content: !!updatedContent.content,
        meta: !!updatedMeta.meta,
        contentBlocks: updatedContentBlocks.contentBlocks?.length || 0
      }
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