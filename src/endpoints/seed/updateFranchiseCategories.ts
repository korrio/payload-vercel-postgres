// // franchise-category-update.ts
// // Script runner for updating franchise categories

// import type { Payload, PayloadRequest } from 'payload';

// // Sample data from your actual franchise dataset
// // Replace this with: import franchiseData from './your-complete-franchise-data.json';
// import franchiseData from './franchise_data_dbd_20250506_235749.json';
// // const sampleFranchiseData = [
// //   {
// //     "id": 1234,
// //     "brand_name": "เตี๋ยวบางกอก",
// //     "category_name": "อาหาร",
// //     "franchise_type": "ก๋วยเตี๋ยวเรือ"
// //   },
// //   {
// //     "id": 993,
// //     "brand_name": "สะโรรักษ์",
// //     "category_name": "ความงามและสปา",
// //     "franchise_type": "ความงามและสปา"
// //   },
// //   {
// //     "id": 1056,
// //     "brand_name": "Talad Tutor Thailand .com",
// //     "category_name": "การศึกษา",
// //     "franchise_type": "การศึกษา"
// //   },
// //   {
// //     "id": 1085,
// //     "brand_name": "YoYi!",
// //     "category_name": "บริการ",
// //     "franchise_type": "บริการขนส่ง ฝากพัสดุ"
// //   },
// //   {
// //     "id": 312,
// //     "brand_name": "โซดา 168",
// //     "category_name": "เครื่องดื่ม",
// //     "franchise_type": "เครื่องดื่มอิตาเลี่ยนโซดา และ ปาท่องโก๋สเปน"
// //   },
// //   {
// //     "id": 1047,
// //     "brand_name": "Zen 28 Transform",
// //     "category_name": "ค้าปลีก",
// //     "franchise_type": "ค้าปลีก"
// //   },
// //   {
// //     "id": 176,
// //     "brand_name": "BCO (Beauty Center Online)",
// //     "category_name": "ความงามและสปา",
// //     "franchise_type": "ความงามและสปา"
// //   }
// // ];

// interface FranchiseRawData {
//   id: number;
//   brand_name: string;
//   company_name: string;
//   category_name: string;
//   franchise_type: string;
//   [key: string]: any;
// }

// /**
//  * Main function to update franchise categories
//  * Replace sampleFranchiseData with your actual import if you have the full JSON file
//  */
// export const updateFranchiseCategories = async ({
//   payload,
//   req,
// }: {
//   payload: Payload;
//   req: PayloadRequest;
// }): Promise<void> => {
//   payload.logger.info('🚀 Starting franchise category updates...');

//   try {
//     // Use sample data or replace with: import franchiseData from './your-franchise-data.json';
//     // const franchiseData = sampleFranchiseData;
//     // const franchiseData = await import('./franchise_data_dbd_20250506_235749.json') as { default: any[] }

//     // Step 1: Get existing franchise categories from database
//     payload.logger.info('📂 Fetching franchise categories...');
//     const categories = await payload.find({
//       collection: 'franchise_categories',
//       limit: 100,
//     });

//     const categoryMap = new Map<string, number>();
//     categories.docs.forEach((cat: any) => {
//       categoryMap.set(cat.title, cat.id);
//     });

//     payload.logger.info(`Found ${categoryMap.size} categories:`);
//     categoryMap.forEach((id, title) => {
//       payload.logger.info(`  • ${title} (ID: ${id})`);
//     });

//     // Step 2: Create enhanced mapping function with all observed categories
//     const mapCategory = (rawCategoryName: string): number | null => {
//       // Direct match first
//       if (categoryMap.has(rawCategoryName)) {
//         return categoryMap.get(rawCategoryName)!;
//       }

//       // Enhanced fuzzy mappings based on your actual data
//       const mappings: Record<string, string> = {
//         // Food categories
//         'อาหาร': 'อาหาร • เบเกอรี่',
        
//         // Beverage categories  
//         'เครื่องดื่ม': 'เครื่องดื่ม • ไอศกรีม',
        
//         // Service categories
//         'บริการ': 'บริการ • งานพิมพ์',
        
//         // Education
//         'การศึกษา': 'การศึกษา',
        
//         // Beauty & Spa
//         'ความงาม': 'ความงามและสปา',
//         'ความงามและสปา': 'ความงามและสปา',
        
//         // Retail
//         'ค้าปลีก': 'ค้าปลีก',
//         'ขายปลีก': 'ค้าปลีก',
//         'ร้านค้า': 'ค้าปลีก',
//       };

//       const mapped = mappings[rawCategoryName];
//       if (mapped && categoryMap.has(mapped)) {
//         return categoryMap.get(mapped)!;
//       }

//       return null;
//     };

//     // Step 3: Get existing franchises
//     payload.logger.info('📋 Fetching existing franchises...');
//     const existingFranchises = await payload.find({
//       collection: 'franchises',
//       limit: 1000,
//       depth: 1,
//     });

//     // Create lookup by fcid
//     const franchisesByFcid = new Map<number, any>();
//     existingFranchises.docs.forEach(franchise => {
//       const fcid = parseInt(franchise.fcid);
//       if (!isNaN(fcid)) {
//         franchisesByFcid.set(fcid, franchise);
//       }
//     });

//     payload.logger.info(`Found ${existingFranchises.docs.length} franchises in database`);

//     // Step 4: Process updates
//     let updated = 0;
//     let skipped = 0;
//     let failed = 0;
//     let notFound = 0;

//     payload.logger.info('🔄 Processing franchise category updates...');

//     for (const rawFranchise of franchiseData) {
//       const franchise = franchisesByFcid.get(rawFranchise.id);
      
//       if (!franchise) {
//         payload.logger.warn(`❌ Franchise not found: ${rawFranchise.brand_name} (ID: ${rawFranchise.id})`);
//         notFound++;
//         continue;
//       }

//       const categoryId = mapCategory(rawFranchise.category_name);
      
//       if (!categoryId) {
//         payload.logger.warn(`❌ No category mapping for: ${rawFranchise.category_name}`);
//         failed++;
//         continue;
//       }

//       // Check if already has this category
//       const currentCategories = franchise.franchise_categories || [];
//       const hasCategory = currentCategories.some((cat: any) => {
//         const catId = typeof cat === 'object' ? cat.id : cat;
//         return catId === categoryId;
//       });

//       if (hasCategory) {
//         payload.logger.info(`⏭️  Already correct: ${franchise.title}`);
//         skipped++;
//         continue;
//       }

//       // Update franchise
//       try {
//         await payload.update({
//           collection: 'franchises',
//           id: franchise.id,
//           data: {
//             franchise_categories: [categoryId],
//           },
//         });

//         const categoryName = [...categoryMap.entries()]
//           .find(([_, id]) => id === categoryId)?.[0] || 'Unknown';

//         payload.logger.info(`✅ Updated: ${franchise.title} → ${categoryName}`);
//         updated++;
//       } catch (error) {
//         payload.logger.error(`❌ Failed to update ${franchise.title}:`, error);
//         failed++;
//       }
//     }

//     // Step 5: Summary
//     payload.logger.info('\n' + '='.repeat(50));
//     payload.logger.info('📊 UPDATE SUMMARY');
//     payload.logger.info('='.repeat(50));
//     payload.logger.info(`Total processed: ${franchiseData.length}`);
//     payload.logger.info(`✅ Successfully updated: ${updated}`);
//     payload.logger.info(`⏭️  Already correct: ${skipped}`);
//     payload.logger.info(`❌ Failed: ${failed}`);
//     payload.logger.info(`🔍 Not found in DB: ${notFound}`);
//     payload.logger.info('='.repeat(50));

//   } catch (error) {
//     payload.logger.error('💥 Script failed:', error);
//     throw error;
//   }
// };