// Frontend utility to track page views
export const trackPageView = async (
  collectionName: 'franchises' | 'markets' | 'posts',
  documentId: string,
  documentTitle?: string,
  categoryId?: string,
  categoryName?: string,
  userId?: string,
  sessionId?: string,
  apiUrl?: string
) => {
  try {
    const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || ''
    
    const response = await fetch(`${baseUrl}/api/track-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionName,
        documentId,
        documentTitle,
        categoryId,
        categoryName,
        userId,
        sessionId,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error tracking page view:', error)
    // Don't throw error to avoid breaking page functionality
    return null
  }
}

// Generate or get session ID for anonymous users
export const getSessionId = (): string => {
  if (typeof window === 'undefined') {
    return ''
  }
  
  let sessionId = localStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('session_id', sessionId)
  }
  
  return sessionId
}