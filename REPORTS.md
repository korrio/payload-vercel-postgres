# รายงาน Dashboard

## Overview
ระบบรายงานสำหรับแสดงข้อมูลสถิติการใช้งานเว็บไซต์แฟรนไชส์และเซ้ง/เช่า

## Features
1. **รายงานผู้เข้าชม ของแฟรนไชส์** (แสดง top 10)
2. **รายงานผู้เข้าชม แต่ละ category**
3. **รายงานจำนวนแฟรนไชส์ที่เพิ่มเข้ามาใหม่**
4. **รายงานจำนวนแฟรนไชส์ทั้งหมด**
5. **รายงานผู้เข้าชม ของเซ้ง/เช่า** (แสดง top 10)
6. **รายงานผู้เข้าชม เซ้ง/เช่าแต่ละจังหวัด**
7. **รายงานจำนวนเซ้ง/เช่าที่เพิ่มเข้ามาใหม่**
8. **รายงานจำนวนเซ้ง/เช่าทั้งหมด**

## How to Access
1. เข้าสู่ระบบ Admin Panel
2. ไปที่ URL: `/admin/reports`
3. หรือใช้ navigation menu ในระบบ Admin

## API Endpoints

### Individual Reports
- `GET /api/reports/franchise-views` - รายงานผู้เข้าชมแฟรนไชส์
- `GET /api/reports/category-views` - รายงานผู้เข้าชมแต่ละหมวดหมู่
- `GET /api/reports/new-franchises` - รายงานแฟรนไชส์ใหม่
- `GET /api/reports/total-franchises` - รายงานจำนวนแฟรนไชส์ทั้งหมด
- `GET /api/reports/market-views` - รายงานผู้เข้าชมเซ้ง/เช่า
- `GET /api/reports/province-views` - รายงานผู้เข้าชมแต่ละจังหวัด
- `GET /api/reports/new-markets` - รายงานเซ้ง/เช่าใหม่
- `GET /api/reports/total-markets` - รายงานจำนวนเซ้ง/เช่าทั้งหมด

### Combined Report
- `GET /api/reports/all` - รายงานทั้งหมดในครั้งเดียว

### View Tracking
- `POST /api/track-view` - บันทึกการเข้าชมหน้า

## View Tracking Usage

### Frontend Integration
```javascript
import { trackPageView, getSessionId } from '../utilities/trackView'

// Track franchise page view
trackPageView(
  'franchises',
  franchiseId,
  franchiseTitle,
  categoryId,
  categoryName,
  userId, // if logged in
  getSessionId() // for anonymous users
)

// Track market page view
trackPageView(
  'markets',
  marketId,
  marketTitle,
  province, // use province as categoryId
  provinceName, // use province name as categoryName
  userId,
  getSessionId()
)
```

### Required Data for Tracking
- `collectionName`: 'franchises' | 'markets' | 'posts'
- `documentId`: ID ของเอกสาร
- `documentTitle`: ชื่อเอกสาร (optional)
- `categoryId`: ID หมวดหมู่หรือจังหวัด (optional)
- `categoryName`: ชื่อหมวดหมู่หรือจังหวัด (optional)
- `userId`: ID ผู้ใช้หากล็อกอิน (optional)
- `sessionId`: Session ID สำหรับผู้ใช้ไม่ล็อกอิน (optional)

## Database Schema

### Views Collection
- `collectionName`: ชื่อ collection ที่เข้าชม
- `documentId`: ID เอกสารที่เข้าชม
- `documentTitle`: ชื่อเอกสาร
- `categoryId`: ID หมวดหมู่/จังหวัด
- `categoryName`: ชื่อหมวดหมู่/จังหวัด
- `userId`: ID ผู้ใช้
- `sessionId`: Session ID
- `ipAddress`: IP Address
- `userAgent`: User Agent String
- `referrer`: Referrer URL
- `viewedAt`: วันที่เข้าชม

## Setup Instructions

1. **Database Migration**: Views collection จะถูกสร้างอัตโนมัติเมื่อเริ่มต้นระบบ
2. **Frontend Integration**: เพิ่ม view tracking ในหน้า detail ของแฟรนไชส์และเซ้ง/เช่า
3. **Access Control**: ปัจจุบันรายงานสามารถเข้าดูได้โดยผู้ดูแลระบบเท่านั้น

## Performance Considerations

- View tracking ใช้ POST request แบบ async
- ข้อมูลจะไม่ถูกเก็บหากมีข้อผิดพลาดในการส่งข้อมูล
- รายงานจะแสดงข้อมูลแบบ real-time
- สำหรับข้อมูลจำนวนมาก อาจต้องพิจารณาใช้ cache

## Future Enhancements

- เพิ่ม date range filter
- เพิ่มการ export ข้อมูล
- เพิ่ม charts และ graphs
- เพิ่ม email report scheduling
- เพิ่ม advanced analytics