# Page Content Seeding

This directory contains seed data to pre-populate the CMS with content for the `/expand-branches` and `/complaint` pages.

## 📁 Files Overview

- `src/seed/expand-branches-data.ts` - Complete page data for expand-branches page
- `src/seed/complaint-data.ts` - Complete page data for complaint page  
- `src/seed/seed-pages.ts` - Standalone seeding script
- `src/endpoints/seed-pages.ts` - API endpoint for seeding

## 🚀 How to Seed Pages

### Method 1: Via API Endpoint (Recommended)

Make a POST request to the seeding endpoint:

```bash
curl -X POST https://your-cms-domain.com/api/seed-pages
```

Or visit the endpoint in your browser (it will also work with GET).

### Method 2: Via npm Script

```bash
cd payload-vercel-postgres
pnpm install tsx
pnpm seed:pages
```

### Method 3: Manual Creation

1. Go to your Payload admin panel
2. Navigate to Pages collection
3. Create new pages with the following data:

## 📋 Seeded Content

### Expand Branches Page (`/expand-branches`)
- **Hero Section**: Main title, subtitle, pricing, CTA button
- **Text Section**: One-Stop Service description  
- **Pricing Package**: FB PRO package with full feature list
- **Service Cards**: 6 service cards explaining the complete process

### Complaint Page (`/complaint`)  
- **Service Cards**: 3 cards explaining why complaints are important
  - Protect franchise buyer rights (Shield icon)
  - Help franchisors improve quality (ThumbsUp icon)  
  - Resolve legal disputes (FileText icon)

## 🎯 Content Blocks Used

The seeded data demonstrates all available content block types:

1. **Hero Block** - Title, subtitle, pricing, CTA
2. **Text Section Block** - Rich text content with alignment  
3. **Service Cards Block** - Cards with icons and descriptions
4. **Pricing Packages Block** - Complete pricing tables

## ✅ Verification

After seeding, verify the pages are created:

1. Check Payload admin: Collections → Pages
2. Look for pages with slugs: `expand-branches` and `complaint`
3. Visit frontend URLs: `/expand-branches` and `/complaint`

## 🔄 Re-seeding

The seeding script is safe to run multiple times - it will skip existing pages and only create missing ones.

## 🎨 Customization

Edit the data files to customize the seeded content:
- `src/seed/expand-branches-data.ts` - Modify expand-branches content
- `src/seed/complaint-data.ts` - Modify complaint page content

After editing, re-run the seeding to update the CMS with your changes.