export const franchiseViewsReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get all franchise views
    const views = await payload.find({
      collection: 'views',
      where: {
        collectionName: {
          equals: 'franchises',
        },
      },
      limit: 1000, // Get enough for grouping
    })

    // Group by documentId and count
    const viewCounts = views.docs.reduce((acc: any, view: any) => {
      const key = view.documentId
      if (!acc[key]) {
        acc[key] = {
          documentId: view.documentId,
          documentTitle: view.documentTitle || '',
          viewCount: 0,
        }
      }
      acc[key].viewCount++
      return acc
    }, {} as Record<string, { documentId: string; documentTitle: string; viewCount: number }>)

    // Sort by viewCount and get top 10
    const topViews = Object.values(viewCounts)
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 10)

    return Response.json({
      success: true,
      data: topViews,
    })
  } catch (error) {
    console.error('Error in franchiseViewsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate franchise views report',
    }, { status: 500 })
  }
}

export const categoryViewsReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get all franchise views with categories
    const views = await payload.find({
      collection: 'views',
      where: {
        and: [
          {
            collectionName: {
              equals: 'franchises',
            },
          },
          {
            categoryId: {
              not_equals: '',
            },
          },
        ],
      },
      limit: 1000,
    })

    // Group by categoryId and count
    const categoryCounts = views.docs.reduce((acc: any, view: any) => {
      const key = view.categoryId
      if (key && !acc[key]) {
        acc[key] = {
          categoryId: view.categoryId,
          categoryName: view.categoryName || '',
          viewCount: 0,
        }
      }
      if (key) {
        acc[key].viewCount++
      }
      return acc
    }, {} as Record<string, { categoryId: string; categoryName: string; viewCount: number }>)

    const sortedCategories = Object.values(categoryCounts)
      .sort((a: any, b: any) => b.viewCount - a.viewCount)

    return Response.json({
      success: true,
      data: sortedCategories,
    })
  } catch (error) {
    console.error('Error in categoryViewsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate category views report',
    }, { status: 500 })
  }
}

export const newFranchisesReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get franchises added in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const newFranchises = await payload.find({
      collection: 'franchises',
      where: {
        createdAt: {
          greater_than_equal: thirtyDaysAgo.toISOString(),
        },
      },
      sort: '-createdAt',
      limit: 1000,
    })

    // Group by date
    const groupedByDate = newFranchises.docs.reduce((acc: any, franchise: any) => {
      const date = new Date(franchise.createdAt).toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { date, count: 0 }
      }
      acc[date].count++
      return acc
    }, {} as Record<string, { date: string; count: number }>)

    const sortedByDate = Object.values(groupedByDate)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return Response.json({
      success: true,
      data: {
        total: newFranchises.totalDocs,
        byDate: sortedByDate,
      },
    })
  } catch (error) {
    console.error('Error in newFranchisesReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate new franchises report',
    }, { status: 500 })
  }
}

export const totalFranchisesReport = async (req: any) => {
  try {
    const { payload } = req
    
    const totalFranchises = await payload.count({
      collection: 'franchises',
    })

    // Get categories
    const categories = await payload.find({
      collection: 'franchise_categories',
      limit: 100,
    })

    // Get count by category
    const byCategory = await Promise.all(
      categories.docs.map(async (category: any) => {
        const count = await payload.count({
          collection: 'franchises',
          where: {
            franchise_categories: {
              contains: category.id,
            },
          },
        })
        return {
          categoryId: category.id,
          categoryName: category.title,
          count: count.totalDocs,
        }
      })
    )

    return Response.json({
      success: true,
      data: {
        total: totalFranchises.totalDocs,
        byCategory: byCategory.filter((c: any) => c.count > 0),
      },
    })
  } catch (error) {
    console.error('Error in totalFranchisesReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate total franchises report',
    }, { status: 500 })
  }
}

export const marketViewsReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get all market views
    const views = await payload.find({
      collection: 'views',
      where: {
        collectionName: {
          equals: 'markets',
        },
      },
      limit: 1000,
    })

    // Group by documentId and count
    const viewCounts = views.docs.reduce((acc: any, view: any) => {
      const key = view.documentId
      if (!acc[key]) {
        acc[key] = {
          documentId: view.documentId,
          documentTitle: view.documentTitle || '',
          viewCount: 0,
        }
      }
      acc[key].viewCount++
      return acc
    }, {} as Record<string, { documentId: string; documentTitle: string; viewCount: number }>)

    // Sort by viewCount and get top 10
    const topViews = Object.values(viewCounts)
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 10)

    return Response.json({
      success: true,
      data: topViews,
    })
  } catch (error) {
    console.error('Error in marketViewsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate market views report',
    }, { status: 500 })
  }
}

export const provinceViewsReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get all market views with provinces
    const views = await payload.find({
      collection: 'views',
      where: {
        and: [
          {
            collectionName: {
              equals: 'markets',
            },
          },
          {
            categoryId: {
              not_equals: '',
            },
          },
        ],
      },
      limit: 1000,
    })

    // Group by province (categoryId) and count
    const provinceCounts = views.docs.reduce((acc: any, view: any) => {
      const key = view.categoryId
      if (key && !acc[key]) {
        acc[key] = {
          province: view.categoryId,
          provinceName: view.categoryName || '',
          viewCount: 0,
        }
      }
      if (key) {
        acc[key].viewCount++
      }
      return acc
    }, {} as Record<string, { province: string; provinceName: string; viewCount: number }>)

    const sortedProvinces = Object.values(provinceCounts)
      .sort((a: any, b: any) => b.viewCount - a.viewCount)

    return Response.json({
      success: true,
      data: sortedProvinces,
    })
  } catch (error) {
    console.error('Error in provinceViewsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate province views report',
    }, { status: 500 })
  }
}

export const newMarketsReport = async (req: any) => {
  try {
    const { payload } = req
    
    // Get markets added in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const newMarkets = await payload.find({
      collection: 'markets',
      where: {
        createdAt: {
          greater_than_equal: thirtyDaysAgo.toISOString(),
        },
      },
      sort: '-createdAt',
      limit: 1000,
    })

    // Group by date
    const groupedByDate = newMarkets.docs.reduce((acc: any, market: any) => {
      const date = new Date(market.createdAt).toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { date, count: 0 }
      }
      acc[date].count++
      return acc
    }, {} as Record<string, { date: string; count: number }>)

    const sortedByDate = Object.values(groupedByDate)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return Response.json({
      success: true,
      data: {
        total: newMarkets.totalDocs,
        byDate: sortedByDate,
      },
    })
  } catch (error) {
    console.error('Error in newMarketsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate new markets report',
    }, { status: 500 })
  }
}

export const totalMarketsReport = async (req: any) => {
  try {
    const { payload } = req
    
    const totalMarkets = await payload.count({
      collection: 'markets',
    })

    // Get all markets to count by province
    const allMarkets = await payload.find({
      collection: 'markets',
      limit: 5000, // Adjust based on your data size
    })

    // Group by province
    const provinceCounts = allMarkets.docs.reduce((acc: any, market: any) => {
      const province = market.address?.province
      if (province) {
        if (!acc[province]) {
          acc[province] = { province, count: 0 }
        }
        acc[province].count++
      }
      return acc
    }, {} as Record<string, { province: string; count: number }>)

    const sortedProvinces = Object.values(provinceCounts)
      .filter((p: any) => p.count > 0)
      .sort((a: any, b: any) => b.count - a.count)

    return Response.json({
      success: true,
      data: {
        total: totalMarkets.totalDocs,
        byProvince: sortedProvinces,
      },
    })
  } catch (error) {
    console.error('Error in totalMarketsReport:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate total markets report',
    }, { status: 500 })
  }
}

export const allReportsData = async (req: any) => {
  try {
    const { payload } = req

    // Get all report data directly without using individual report functions
    // to avoid the response mocking complexity

    // 1. Franchise views
    const franchiseViewsData = await payload.find({
      collection: 'views',
      where: { collectionName: { equals: 'franchises' } },
      limit: 1000,
    })
    const franchiseViewCounts = franchiseViewsData.docs.reduce((acc: any, view: any) => {
      const key = view.documentId
      if (!acc[key]) {
        acc[key] = { documentId: view.documentId, documentTitle: view.documentTitle || '', viewCount: 0 }
      }
      acc[key].viewCount++
      return acc
    }, {} as Record<string, any>)
    const franchiseViews = { 
      success: true, 
      data: Object.values(franchiseViewCounts).sort((a: any, b: any) => b.viewCount - a.viewCount).slice(0, 10) 
    }

    // 2. Category views
    const categoryViewsData = await payload.find({
      collection: 'views',
      where: {
        and: [
          { collectionName: { equals: 'franchises' } },
          { categoryId: { not_equals: '' } }
        ]
      },
      limit: 1000,
    })
    const categoryCounts = categoryViewsData.docs.reduce((acc: any, view: any) => {
      const key = view.categoryId
      if (key && !acc[key]) {
        acc[key] = { categoryId: view.categoryId, categoryName: view.categoryName || '', viewCount: 0 }
      }
      if (key) acc[key].viewCount++
      return acc
    }, {} as Record<string, any>)
    const categoryViews = { 
      success: true, 
      data: Object.values(categoryCounts).sort((a: any, b: any) => b.viewCount - a.viewCount) 
    }

    // 3. New franchises
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newFranchisesData = await payload.find({
      collection: 'franchises',
      where: { createdAt: { greater_than_equal: thirtyDaysAgo.toISOString() } },
      sort: '-createdAt',
      limit: 1000,
    })
    const franchisesByDate = newFranchisesData.docs.reduce((acc: any, franchise: any) => {
      const date = new Date(franchise.createdAt).toISOString().split('T')[0]
      if (!acc[date]) acc[date] = { date, count: 0 }
      acc[date].count++
      return acc
    }, {} as Record<string, any>)
    const newFranchises = {
      success: true,
      data: {
        total: newFranchisesData.totalDocs,
        byDate: Object.values(franchisesByDate).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
    }

    // 4. Total franchises
    const totalFranchisesCount = await payload.count({ collection: 'franchises' })
    const categories = await payload.find({ collection: 'franchise_categories', limit: 100 })
    const byCategory = await Promise.all(
      categories.docs.map(async (category: any) => {
        const count = await payload.count({
          collection: 'franchises',
          where: { 
            franchise_categories: { 
              contains: category.id 
            } 
          }
        })
        return { categoryId: category.id, categoryName: category.title, count: count.totalDocs }
      })
    )
    const totalFranchises = {
      success: true,
      data: {
        total: totalFranchisesCount.totalDocs,
        byCategory: byCategory.filter((c: any) => c.count > 0)
      }
    }

    // 5. Market views
    const marketViewsData = await payload.find({
      collection: 'views',
      where: { collectionName: { equals: 'markets' } },
      limit: 1000,
    })
    const marketViewCounts = marketViewsData.docs.reduce((acc: any, view: any) => {
      const key = view.documentId
      if (!acc[key]) {
        acc[key] = { documentId: view.documentId, documentTitle: view.documentTitle || '', viewCount: 0 }
      }
      acc[key].viewCount++
      return acc
    }, {} as Record<string, any>)
    const marketViews = { 
      success: true, 
      data: Object.values(marketViewCounts).sort((a: any, b: any) => b.viewCount - a.viewCount).slice(0, 10) 
    }

    // 6. Province views
    const provinceViewsData = await payload.find({
      collection: 'views',
      where: {
        and: [
          { collectionName: { equals: 'markets' } },
          { categoryId: { not_equals: '' } }
        ]
      },
      limit: 1000,
    })
    const provinceCounts = provinceViewsData.docs.reduce((acc: any, view: any) => {
      const key = view.categoryId
      if (key && !acc[key]) {
        acc[key] = { province: view.categoryId, provinceName: view.categoryName || '', viewCount: 0 }
      }
      if (key) acc[key].viewCount++
      return acc
    }, {} as Record<string, any>)
    const provinceViews = { 
      success: true, 
      data: Object.values(provinceCounts).sort((a: any, b: any) => b.viewCount - a.viewCount) 
    }

    // 7. New markets
    const newMarketsData = await payload.find({
      collection: 'markets',
      where: { createdAt: { greater_than_equal: thirtyDaysAgo.toISOString() } },
      sort: '-createdAt',
      limit: 1000,
    })
    const marketsByDate = newMarketsData.docs.reduce((acc: any, market: any) => {
      const date = new Date(market.createdAt).toISOString().split('T')[0]
      if (!acc[date]) acc[date] = { date, count: 0 }
      acc[date].count++
      return acc
    }, {} as Record<string, any>)
    const newMarkets = {
      success: true,
      data: {
        total: newMarketsData.totalDocs,
        byDate: Object.values(marketsByDate).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
    }

    // 8. Total markets
    const totalMarketsCount = await payload.count({ collection: 'markets' })
    const allMarkets = await payload.find({ collection: 'markets', limit: 5000 })
    const provinceCountsMarket = allMarkets.docs.reduce((acc: any, market: any) => {
      const province = market.address?.province
      if (province) {
        if (!acc[province]) acc[province] = { province, count: 0 }
        acc[province].count++
      }
      return acc
    }, {} as Record<string, any>)
    const totalMarkets = {
      success: true,
      data: {
        total: totalMarketsCount.totalDocs,
        byProvince: Object.values(provinceCountsMarket).filter((p: any) => p.count > 0).sort((a: any, b: any) => b.count - a.count)
      }
    }

    return Response.json({
      success: true,
      data: {
        franchiseViews,
        categoryViews,
        newFranchises,
        totalFranchises,
        marketViews,
        provinceViews,
        newMarkets,
        totalMarkets,
      },
    })
  } catch (error) {
    console.error('Error in allReportsData:', error)
    return Response.json({
      success: false,
      error: 'Failed to generate all reports data',
    }, { status: 500 })
  }
}