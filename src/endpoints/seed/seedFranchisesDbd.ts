// import franchiseData from './franchise_data_dbd_20250506_235749.json';

// export const seedFranchisesDbd = async ({
//   payload,
//   req,
// }: {
//   payload: Payload;
//   req: PayloadRequest;
// }): Promise<void> => {
//   payload.logger.info('Seeding franchises data...');

//   // First, handle the franchise categories
//   payload.logger.info('— Updating franchise categories...');
  
//   const categoryDefinitions: FranchiseCategory[] = [
//     {
//       id: 1,
//       title: 'อาหาร • เบเกอรี่',
//       name_en: 'Food • Bakery',
//       description: null,
//       slug: 'food-bakery'
//     },
//     {
//       id: 3,
//       title: 'เครื่องดื่ม • ไอศกรีม',
//       name_en: 'Beverage • Icecream',
//       description: null,
//       slug: 'beverage-icecream'
//     },
//     {
//       id: 4,
//       title: 'บริการ • งานพิมพ์',
//       name_en: 'Services • Printing',
//       description: null,
//       slug: 'services-printing'
//     },
//     {
//       id: 5,
//       title: 'การศึกษา',
//       name_en: 'Education',
//       description: null,
//       slug: 'education'
//     },
//     {
//       id: 6, 
//       title: 'ความงามและสปา',
//       name_en: 'Beauty & Spa',
//       description: null,
//       slug: 'beauty-spa'
//     },
//     {
//       id: 7,
//       title: 'ค้าปลีก',
//       name_en: 'Retail',
//       description: null,
//       slug: 'retail'
//     }
//   ];
  
//   // Helper function to extract the main category from a category title
//   function getThaiByCategoryTitle(title: string): string {
//     const mainPart = title.split('•')[0]?.trim();
//     if (mainPart === 'อาหาร') return 'อาหาร';
//     if (mainPart === 'เครื่องดื่ม') return 'เครื่องดื่ม';
//     if (mainPart === 'บริการ') return 'บริการ';
//     if (title.includes('การศึกษา')) return 'การศึกษา';
//     if (title.includes('ความงามและสปา')) return 'ความงามและสปา';
//     if (title.includes('ค้าปลีก')) return 'ค้าปลีก';
//     return title;
//   }
  
//   // Update or create categories and build the mapping
//   const categoryIdMap = new Map<string, string>();
  
//   for (const category of categoryDefinitions) {
//     try {
//       // Check if category exists by slug
//       const existingCategory = await payload.find({
//         collection: 'franchise_categories',
//         where: {
//           slug: {
//             equals: category.slug,
//           },
//         },
//         limit: 1,
//       });
      
//       let categoryId: string;
      
//       if (existingCategory.docs.length > 0) {
//         // Update existing category
//         const updated = await payload.update({
//           collection: 'franchise_categories',
//           id: existingCategory.docs[0].id,
//           data: {
//             title: category.title,
//             name_en: category.name_en,
//             description: category.description,
//             slug: category.slug,
//           },
//         });
//         categoryId = updated.id;
//         payload.logger.info(`— Updated category: ${category.title} (ID: ${categoryId})`);
//       } else {
//         // Create new category
//         const result = await payload.create({
//           collection: 'franchise_categories',
//           data: {
//             title: category.title,
//             name_en: category.name_en,
//             description: category.description,
//             slug: category.slug,
//           },
//         });
//         categoryId = result.id;
//         payload.logger.info(`— Created category: ${category.title} (ID: ${categoryId})`);
//       }
      
//       categoryIdMap.set(getThaiByCategoryTitle(category.title), categoryId);
//     } catch (error) {
//       payload.logger.error(`Error updating/creating category ${category.title}:`, error);
//     }
//   }
  
//   // Log the final category mapping
//   payload.logger.info('— Category ID mapping:');
//   categoryIdMap.forEach((id, name) => {
//     payload.logger.info(`  ${name}: ${id}`);
//   });
  
//   // Define mapping from Thai category names to category IDs
//   const categoryMapping: Record<string, string> = {
//     'อาหาร': categoryIdMap.get('อาหาร') || '',
//     'เครื่องดื่ม': categoryIdMap.get('เครื่องดื่ม') || '',
//     'บริการ': categoryIdMap.get('บริการ') || '',
//     'การศึกษา': categoryIdMap.get('การศึกษา') || '',
//     'ความงามและสปา': categoryIdMap.get('ความงามและสปา') || '',
//     'ค้าปลีก': categoryIdMap.get('ค้าปลีก') || ''
//   };

//   payload.logger.info(`— Processing ${franchiseData.length} franchises...`);

//   // Process franchise data with MINIMAL fields to avoid undefined issues
//   let succeeded = 0;
//   let failed = 0;
//   const errors: string[] = [];

  
//   // Process franchises one by one with minimal data first
//   for (let i = 0; i < franchiseData.length; i++) {
//     const franchise = franchiseData[i];
    
//     try {

//   		const minInvestment = parseFloat(franchise.min_investment) || 0;
//     const maxInvestment = parseFloat(franchise.max_investment) || 0;
    
//     // Use average of min and max for investment amount, or just one if the other is 0
//     const investmentAmount = minInvestment && maxInvestment 
//       ? (minInvestment + maxInvestment) / 2 
//       : (minInvestment || maxInvestment);

//     // Extract number of branches from the branches string
//     const branchCount = extractNumberFromString(franchise.branches);

//     // Process entrance fee string to get number
//     const entranceFee = extractNumberFromString(franchise.entrance_fee);
    
//     // Map the category from Thai name to category ID
//     // const categoryId = categoryMapping[franchise.category_name] || null;
//       // Create minimal franchise data object with only required fields
//       const minimalFranchiseData = {
//         // fcid: franchise.id.toString(),
//         // title: franchise.brand_name || `Franchise ${i + 1}`,
//         // name_th: franchise.brand_name || `Franchise ${i + 1}`,
//         // description: franchise.short_description || franchise.description || '',
//         // business_type: franchise.franchise_type || '',
//         fcid: franchise.id.toString(),
//       title: franchise.brand_name,
//       name_th: franchise.brand_name,
//       name_en: null, // No English name provided in the data
//       description: franchise.short_description || franchise.description || '',
//       business_type: franchise.franchise_type || '',
//       slug: `franchise-${i + 1}`,
      
//       // Process franchise_fee from entrance_fee
//       franchise_fee: franchise.entrance_fee ? {
//         amount: franchise.entrance_fee,
//         unit: franchise.entrance_fee
//       } : undefined,
      
//       // Process investment from min_investment/max_investment
//       investment: investmentAmount ? {
//         amount: investmentAmount,
//         unit: 'บาท'
//       } : undefined,
      
//       // No working_capital in provided data
//       working_capital: undefined,
      
//       // No contract_period in provided data
//       contract_period: undefined,
      
//       // No roi_period in provided data
//       roi_period: undefined,
      
//       // Process branch information
//       branch_info: {
//         headquarters: '1', // Assuming headquarters is always 1
//         franchisee: branchCount ? branchCount.toString() : '0',
//         international: '0' // No international data provided
//       },
      
//       // Process contact_info
//       contact_info: {
//         company_name: franchise.company_name || '',
//         executive_name: franchise.contact_name || '',
//         address: franchise.address || '',
//         phone: cleanPhoneNumber(franchise.phone) || cleanPhoneNumber(franchise.mobile) || '',
//         email: cleanEmail(franchise.email) || '',
//         website: cleanWebsite(franchise.website) || ''
//       },
      
//       // Process social_stats (not provided in current data)
//       social_stats: {
//         views: franchise.rating_count?.toString() || '0',
//         requests: '0',
//         votes: franchise.rating_sum || '0'
//       },
      
//       // Empty historical_growth array
//       historical_growth: [],
      
//       // Default status to active
//       status: 'active',
      
//       // Add logo URL if available
//       logo_url: franchise.logo || undefined,
      
//       // Set the category reference
//       // category: categoryId,
//       // franchise_categories: [categoryId]
        
//       };
      
//       // Validate required fields
//       if (!minimalFranchiseData.title || !minimalFranchiseData.name_th) {
//         throw new Error('Missing required title or name_th');
//       }
      
//       // Log what we're about to create for debugging
//       if (i < 3) { // Only log first 3 for debugging
//         payload.logger.info(`— Debug franchise ${i + 1}:`, {
//           title: minimalFranchiseData.title,
//           slug: minimalFranchiseData.slug,
//           categoryName: franchise.category_name,
//           categoryId: categoryMapping[franchise.category_name]
//         });
//       }
      
//       // Create franchise with minimal data
//       const created = await payload.create({
//         collection: 'franchises',
//         data: minimalFranchiseData,
//         depth: 0,
//         draft: false,
//         context: {
//           disableRevalidate: true,
//         },
//       });
      
//       succeeded++;
      
//       // Log progress every 50 items
//       if ((i + 1) % 50 === 0) {
//         payload.logger.info(`— Progress: ${i + 1}/${franchiseData.length} processed`);
//       }
      
//       // Optional: Add category relationship if valid category exists
//       const categoryId = categoryMapping[franchise.category_name];
//       if (categoryId) {
//         try {
//           await payload.update({
//             collection: 'franchises',
//             id: created.id,
//             data: {
//               franchise_categories: [categoryId],
//             },
//             depth: 0,
//             context: {
//               disableRevalidate: true,
//             },
//           });
//         } catch (relError) {
//           payload.logger.warn(`Failed to add category relationship for ${franchise.brand_name}:`, relError);
//         }
//       }
      
//     } catch (error) {
//       failed++;
//       const errorMessage = error instanceof Error ? error.message : String(error);
//       errors.push(`Failed to create franchise "${franchise.brand_name}": ${errorMessage}`);
      
//       // Log detailed error for debugging
//       payload.logger.error(`Error creating franchise ${i + 1} (${franchise.brand_name}):`, {
//         error: errorMessage,
//         franchiseData: {
//           brand_name: franchise.brand_name,
//           category_name: franchise.category_name,
//           slug: franchise.slug
//         }
//       });
//     }
    
//     // Small delay every 10 items to prevent overwhelming the database
//     if (i > 0 && i % 10 === 0) {
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
//   }
  
//   payload.logger.info(`— Successfully seeded ${succeeded} franchises`);
  
//   if (failed > 0) {
//     payload.logger.error(`— Failed to seed ${failed} franchises`);
//     errors.slice(0, 5).forEach((error, index) => {
//       payload.logger.error(`— Error ${index + 1}: ${error}`);
//     });
//   }

//   payload.logger.info('Franchise seeding completed!');
// };

// // Helper functions (keep these exactly as they were)
// function extractSlugFromUrl(url: string): string {
//   if (!url) return '';
//   const parts = url.split('/');
//   return parts[parts.length - 1];
// }

// function createSlug(text: string): string {
//   if (!text) return '';
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, '-')
//     .replace(/[^\w\-]+/g, '')
//     .replace(/\-\-+/g, '-')
//     .replace(/^-+/, '')
//     .replace(/-+$/, '');
// }

// function extractNumberFromString(str: string): number {
//   if (!str) return 0;
//   if (str === "-") return 0;
  
//   const numbersOnly = str.replace(/[^\d.,]/g, '');
//   const formattedNumber = numbersOnly.replace(/,/g, '');
//   const result = parseFloat(formattedNumber);
//   return isNaN(result) ? 0 : result;
// }

// function cleanPhoneNumber(phoneStr?: string): string {
//   if (!phoneStr) return '';
//   return phoneStr.replace(/[^\d,]/g, '');
// }

// function cleanEmail(emailStr?: string): string {
//   if (!emailStr) return '';
//   const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
//   const match = emailStr.match(emailRegex);
//   return match ? match[0] : emailStr.trim();
// }

// function cleanWebsite(websiteStr?: string): string {
//   if (!websiteStr) return '';
//   let cleanedUrl = websiteStr.trim();
//   if (cleanedUrl && !cleanedUrl.match(/^https?:\/\//)) {
//     cleanedUrl = 'https://' + cleanedUrl;
//   }
//   return cleanedUrl;
// }