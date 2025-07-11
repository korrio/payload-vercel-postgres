import { useState, useEffect } from 'react'

interface ReportData {
  franchiseViews: { data: Array<{ documentId: string; documentTitle: string; viewCount: number }> }
  categoryViews: { data: Array<{ categoryId: string; categoryName: string; viewCount: number }> }
  newFranchises: { data: { total: number; byDate: Array<{ date: string; count: number }> } }
  totalFranchises: { data: { total: number; byCategory: Array<{ categoryId: string; categoryName: string; count: number }> } }
  marketViews: { data: Array<{ documentId: string; documentTitle: string; viewCount: number }> }
  provinceViews: { data: Array<{ province: string; provinceName: string; viewCount: number }> }
  newMarkets: { data: { total: number; byDate: Array<{ date: string; count: number }> } }
  totalMarkets: { data: { total: number; byProvince: Array<{ province: string; count: number }> } }
}

export const ReportDashboard = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch('/api/reports/all')
        if (!response.ok) {
          throw new Error('Failed to fetch report data')
        }
        const data = await response.json()
        setReportData(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchReportData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">รายงาน</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">รายงาน</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          เกิดข้อผิดพลาด: {error}
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">รายงาน</h1>
        <div className="text-center py-12">ไม่พบข้อมูล</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">รายงาน</h1>
      
      {/* Franchise Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* 1. รายงานผู้เข้าชม ของแฟรนไชส์ (แสดง top 10) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">1. รายงานผู้เข้าชม ของแฟรนไชส์ (Top 10)</h2>
          <div className="space-y-2">
            {reportData.franchiseViews.data.map((item, index) => (
              <div key={item.documentId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium">{item.documentTitle || `ID: ${item.documentId}`}</span>
                </div>
                <span className="text-blue-600 font-semibold">{item.viewCount} ครั้ง</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. รายงานผู้เข้าชม แต่ละ category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">2. รายงานผู้เข้าชม แต่ละหมวดหมู่</h2>
          <div className="space-y-2">
            {reportData.categoryViews.data.map((item) => (
              <div key={item.categoryId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{item.categoryName}</span>
                <span className="text-green-600 font-semibold">{item.viewCount} ครั้ง</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. รายงานจำนวนแฟรนไชส์ที่เพิ่มเข้ามาใหม่ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">3. รายงานจำนวนแฟรนไชส์ที่เพิ่มเข้ามาใหม่ (30 วัน)</h2>
          <div className="text-3xl font-bold text-purple-600 mb-4">
            {reportData.newFranchises.data.total} รายการ
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {reportData.newFranchises.data.byDate.map((item) => (
              <div key={item.date} className="flex justify-between items-center text-sm">
                <span>{new Date(item.date).toLocaleDateString('th-TH')}</span>
                <span className="font-medium">{item.count} รายการ</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. รายงานจำนวนแฟรนไชส์ทั้งหมด */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">4. รายงานจำนวนแฟรนไชส์ทั้งหมด</h2>
          <div className="text-3xl font-bold text-orange-600 mb-4">
            {reportData.totalFranchises.data.total} รายการ
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <h3 className="font-medium text-gray-700">แยกตามหมวดหมู่:</h3>
            {reportData.totalFranchises.data.byCategory.map((item) => (
              <div key={item.categoryId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{item.categoryName}</span>
                <span className="font-medium">{item.count} รายการ</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Market Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 5. รายงานผู้เข้าชม ของเซ้ง/เช่า (แสดง top 10) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">5. รายงานผู้เข้าชม ของเซ้ง/เช่า (Top 10)</h2>
          <div className="space-y-2">
            {reportData.marketViews.data.map((item, index) => (
              <div key={item.documentId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium">{item.documentTitle || `ID: ${item.documentId}`}</span>
                </div>
                <span className="text-red-600 font-semibold">{item.viewCount} ครั้ง</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. รายงานผู้เข้าชม เซ้ง/เช่าแต่ละจังหวัด */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">6. รายงานผู้เข้าชม เซ้ง/เช่าแต่ละจังหวัด</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {reportData.provinceViews.data.map((item) => (
              <div key={item.province} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{item.provinceName}</span>
                <span className="text-teal-600 font-semibold">{item.viewCount} ครั้ง</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. รายงานจำนวนเซ้ง/เช่าที่เพิ่มเข้ามาใหม่ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">7. รายงานจำนวนเซ้ง/เช่าที่เพิ่มเข้ามาใหม่ (30 วัน)</h2>
          <div className="text-3xl font-bold text-pink-600 mb-4">
            {reportData.newMarkets.data.total} รายการ
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {reportData.newMarkets.data.byDate.map((item) => (
              <div key={item.date} className="flex justify-between items-center text-sm">
                <span>{new Date(item.date).toLocaleDateString('th-TH')}</span>
                <span className="font-medium">{item.count} รายการ</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. รายงานจำนวนเซ้ง/เช่าทั้งหมด */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">8. รายงานจำนวนเซ้ง/เช่าทั้งหมด</h2>
          <div className="text-3xl font-bold text-indigo-600 mb-4">
            {reportData.totalMarkets.data.total} รายการ
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <h3 className="font-medium text-gray-700">แยกตามจังหวัด:</h3>
            {reportData.totalMarkets.data.byProvince.map((item) => (
              <div key={item.province} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{item.province}</span>
                <span className="font-medium">{item.count} รายการ</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}