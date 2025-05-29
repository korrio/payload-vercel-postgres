'use client'

import React, { useEffect, useState } from 'react'
// import { useConfig } from 'payload/components/utilities';
import Link from 'next/link'
// Interface for our summary data
interface SummaryData {
  posts: {
    total: number
    published: number
  }
  markets: {
    total: number
    published: number
  }
  franchises: {
    total: number
    published: number
  }
  lastUpdated: string
}

const SummaryDashboard: React.FC = () => {
  const [franchiseCount, setFranchiseCount] = useState<number>(0)
  const [marketCount, setMarketCount] = useState<number>(0)

  const [userCount, setUserCount] = useState<number>(0)
  const [postCount, setPostCount] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(true)

  // Fetch counts of franchises and markets
  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true)
      try {
        // Fetch franchises count
        const franchiseResponse = await fetch(`/api/franchises`, {
          method: 'GET',
          credentials: 'include',
        })

        if (franchiseResponse.ok) {
          const franchiseData = await franchiseResponse.json()
          setFranchiseCount(franchiseData.totalDocs || 0)
        }

        // Fetch markets count
        const marketResponse = await fetch(`/api/markets`, {
          method: 'GET',
          credentials: 'include',
        })

        if (marketResponse.ok) {
          const marketData = await marketResponse.json()
          setMarketCount(marketData.totalDocs || 0)
        }

         // Fetch posts count
        const postResponse = await fetch(`/api/posts`, {
          method: 'GET',
          credentials: 'include',
        })

        if (postResponse.ok) {
          const postData = await postResponse.json()
          setPostCount(postData.totalDocs || 0)
        }

         // Fetch markets count
        const userResponse = await fetch(`/api/users`, {
          method: 'GET',
          credentials: 'include',
        })

        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUserCount(userData.totalDocs || 0)
        }
      } catch (error) {
        console.error('Error fetching counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SummaryData | null>(null)

  // Get the serverURL from Payload config
  // const { serverURL } = useConfig();

  const serverURL = 'http://localhost:3000'

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true)
        setError(null)

        // // Make API request to our custom endpoint
        // const response = await fetch(`${serverURL}/api/summary`);

        // if (!response.ok) {
        //   throw new Error(`API responded with status: ${response.status}`);
        // }

        // const summaryData = await response.json();
        const summaryData = {
          posts: {
            total: 120,
            published: 85,
          },
          markets: {
            total: 47,
            published: 32,
          },
          franchises: {
            total: 65,
            published: 41,
          },
          lastUpdated: '2025-04-24T15:30:45.123Z',
        }
        setData(summaryData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        console.error('Error fetching summary data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummaryData()

    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(fetchSummaryData, 5 * 60 * 1000)

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval)
  }, [serverURL])

  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  // Calculate percentage
  const getPercentage = (published: number, total: number) => {
    if (total === 0) return '0%'
    return `${Math.round((published / total) * 100)}%`
  }

  // Render loading state
  if (loading && !data) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading summary data...</p>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  // Render dashboard with data
  return (
    <div className="hidden container mx-auto px-4 py-8">
      <div className="dashboard__card-list">
        <div className="card card-pages card--has-onclick">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card__title">แฟรนไชส์ทั้งหมด</h3>
              <h3 className="text-3xl font-bold text-gray-700">
                {loading ? '...' : franchiseCount}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full"></div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/franchises" className="text-sm text-blue-600 hover:underline">
              ดูแฟรนไชส์ทั้งหมด &rarr;
            </Link>
          </div>
        </div>

        <div className="card card-pages card--has-onclick">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card__title">ตลาดทั้งหมด</h3>
              <h3 className="text-3xl font-bold text-gray-700">{loading ? '...' : marketCount}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full"></div>
          </div>
          <div className="hidden mt-4">
            <Link href="/dashboard/markets" className="text-sm text-green-600 hover:underline">
              ดูตลาดทั้งหมด &rarr;
            </Link>
          </div>
        </div>

        <div className="card card-pages card--has-onclick">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card__title">บทความทั้งหมด</h3>
                <h3 className="text-3xl font-bold text-gray-700">{loading ? '...' : postCount}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full"></div>
          </div>
          <div className="hidden mt-4">
            <Link href="/dashboard/profile" className="text-sm text-purple-600 hover:underline">
              ดูโปรไฟล์ของคุณ &rarr;
            </Link>
          </div>
        </div>

        <div className="card card-pages card--has-onclick">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card__title">ผู้ใช้ทั้งหมด</h3>
                <h3 className="text-3xl font-bold text-gray-700">{loading ? '...' : userCount}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full"></div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              เปิดใช้งาน
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryDashboard
