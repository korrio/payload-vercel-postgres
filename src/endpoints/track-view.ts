export const trackView = async (req: any) => {
  try {
    const { payload } = req
    
    // Read the request body
    const data = await req.json()
    const { 
      collectionName, 
      documentId, 
      documentTitle, 
      categoryId, 
      categoryName, 
      userId, 
      sessionId 
    } = data

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     req.socket?.remoteAddress || 
                     (req.connection?.socket ? req.connection.socket.remoteAddress : null) ||
                     'unknown'

    // Get user agent
    const userAgent = req.headers['user-agent'] || ''

    // Get referrer
    const referrer = req.headers['referer'] || req.headers['referrer'] || ''

    console.log("data",data)

    // Validate required fields
    if (!collectionName || !documentId) {
      return Response.json({
        success: false,
        error: 'collectionName and documentId are required',
      }, { status: 400 })
    }

    // Create view record
    const viewRecord = await payload.create({
      collection: 'views',
      data: {
        collectionName,
        documentId: String(documentId),
        documentTitle: documentTitle || '',
        categoryId: categoryId || '',
        categoryName: categoryName || '',
        userId: userId || '',
        sessionId: sessionId || '',
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        userAgent,
        referrer,
        viewedAt: new Date().toISOString(),
      },
    })

    return Response.json({
      success: true,
      data: viewRecord,
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return Response.json({
      success: false,
      error: 'Failed to track view',
    }, { status: 500 })
  }
}