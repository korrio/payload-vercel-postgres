// // Fixed seeding script - remove manual timestamp handling

// import marketsData from './markets_data_2000.json';

// // Fixed seeding script - remove manual timestamp handling

// export const seedMarkets = async ({
//   payload,
//   req,
// }: {
//   payload: Payload;
//   req: PayloadRequest;
// }): Promise<void> => {
//   payload.logger.info('Seeding markets data...');

//   // Clear existing markets data
//   payload.logger.info('— Clearing markets collection...');
//   await payload.db.deleteMany({ collection: 'markets', req, where: {} });

//   // If the collection has versions, clear those too
//   if (payload.collections.markets.config.versions) {
//     await payload.db.deleteVersions({ collection: 'markets', req, where: {} });
//   }

//   // Get the market data from the imported JSON
//   const rawData = marketsData.data || [];
//   payload.logger.info(`— Seeding ${rawData.length} markets...`);

//   let indexer = 0;
//   // Process market data to match Payload schema
//   const processedMarkets = rawData
//     .filter((market: MarketRawData) => {
//       indexer++; // Move indexer increment here
//       return market && 
//         market.address && 
//         market.address.country_code === 'TH' && 
//         indexer !== 1090 && 
//         market.price?.description?.th && 
//         market.price?.description?.th !== '';
//     })
//     .map((market: MarketRawData) => {
//       if (!market) {
//         payload.logger.warn(`— Skipping undefined market at index ${indexer}`);
//         return null;
//       }
      
//       payload.logger.info(`— Processing ${market.name?.th || 'Unknown Market'} (${indexer}/${rawData.length})...`);
      
//       try {
//         // Validate required fields first
//         if (!market.name?.th) {
//           throw new Error('Missing required field: name.th');
//         }

//         // Format gallery images safely
//         const galleryUrls = Array.isArray(market.gallery) 
//           ? market.gallery.map(url => ({ image: url }))
//           : [];

//         // Format tags for single array structure
//         const tagsFormatted = Array.isArray(market.tags) 
//           ? market.tags.map(tag => ({ tag: String(tag) }))
//           : [];
        
//         // Return the formatted market data - REMOVE manual timestamps
//         return {
//           // Store original ID for reference
//           originalId: market.id,
          
//           // Meta information
//           meta: {
//             slug: market.meta?.slug || market.id || `market-${indexer}`,
//             title: market.meta?.title || market.name?.th || '',
//             description: market.meta?.description || '',
//           },
          
//           // Basic information
//           title: market.name?.th || market.meta?.slug || `Market ${indexer}`,
//           code: market.code || '',
//           name: {
//             th: market.name?.th || '',
//             en: market.name?.en || '',
//           },
          
//           // Media
//           coverUrl: market.cover || '',
//           galleryUrl: galleryUrls,
          
//           // Tags - simplified structure
//           tags: tagsFormatted,
          
//           // Address information - with better validation
//           address: {
//             place_id: market.address?.place_id || '',
//             country_code: market.address?.country_code || 'TH',
//             territory_id: market.address?.territory_id || '',
//             district: String(market.address?.district.th || ''),
//             district_id: Number(market.address?.district_id) || 0,
//             sub_district: String(market.address?.sub_district.th || ''),
//             sub_district_id: Number(market.address?.sub_district_id) || 0,
//             province: String(market.address?.province.th || ''),
//             province_id: Number(market.address?.province_id) || 0,
//             post_code: Number(market.address?.post_code) || 0,
//             detail: {
//               th: String(market.address?.detail?.th || ''),
//               en: String(market.address?.detail?.en || ''),
//             },
//             // location: {
//             //   type: 'Point',
//             //   coordinates: Array.isArray(market.address?.location?.coordinates) 
//             //     ? market.address.location.coordinates 
//             //     : [],
//             // },
//             maps_url: String(market.address?.maps_url || ''),
//             maps_embed_url: String(market.address?.maps_embed_url || ''),
//           },
          
//           // Business hours - uncommented and fixed
//           business_hours: {
//             description: {
//               th: market.business_hours?.description?.th || '',
//               en: market.business_hours?.description?.en || '',
//             },
//             open: market.business_hours?.open || 0,
//             close: market.business_hours?.close || 0,
//             // days: market.business_hours?.days || [],
//           },
          
//           // Price information
//           price_text: market.price?.description?.th || '',
//           price: {
//             description: {
//               th: market.price?.description?.th || '',
//               en: market.price?.description?.en || '',
//             },
//             month: {
//               min: market.price?.month?.min || 0,
//               max: market.price?.month?.max || 0,
//             },
//           },
          
//           // Booth size
//           booth_size: {
//             description: {
//               th: market.booth_size?.description?.th || '',
//               en: market.booth_size?.description?.en || '',
//             },
//             sqm: {
//               min: market.booth_size?.sqm?.min || 0,
//               max: market.booth_size?.sqm?.max || 0,
//             },
//           },
          
//           // Facility information
//           facility: {
//             parking: market.facility?.parking || 0,
//             toilet: market.facility?.toilet || 0,
//           },
          
//           // Highlight
//           highlight: market.highlight || [],
          
//           // Rating
//           rating: {
//             score: market.rating?.score || 0,
//             count: market.rating?.count || 0,
//           },
          
//           // Publishing information
//           hot: market.hot || false,
//           published: market.published !== false, // Default to true unless explicitly false
//           published_at: market.published_at ? new Date(market.published_at) : null,
          
//           // REMOVED: created_at and updated_at - let Payload handle these automatically
          
//           // Booth summary
//           booth_summary: {
//             available: market.booth_summary?.available || 0,
//             total: market.booth_summary?.total || 0,
//           },
          
//           // Categories
//           categories: market.categories || [],
          
//           // Tracking information
//           tracking: {
//             click: market.tracking?.click || 0,
//           },
//         };
//       } catch (error) {
//         payload.logger.error(`Error processing market ${market.id || indexer}:`, error.message || error);
//         return null;
//       }
//     })
//     .filter(market => market !== null);

//   // Process markets in batches
//   const BATCH_SIZE = 10; // Reduced batch size for better error handling
//   const total = processedMarkets.length;
//   let processed = 0;
//   let succeeded = 0;
//   let failed = 0;
  
//   for (let i = 0; i < total; i += BATCH_SIZE) {
//     const batch = processedMarkets.slice(i, i + BATCH_SIZE);
//     payload.logger.info(`— Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(total / BATCH_SIZE)}...`);
    
//     try {
//       const results = await Promise.allSettled(
//         batch.map(marketData => 
//           payload.create({
//             collection: 'markets',
//             data: marketData,
//             depth: 0,
//             context: {
//               disableRevalidate: true,
//             },
//           })
//         )
//       );
      
//       const batchSucceeded = results.filter(result => result.status === 'fulfilled').length;
//       const batchFailed = results.filter(result => result.status === 'rejected').length;
      
//       succeeded += batchSucceeded;
//       failed += batchFailed;
//       processed += batch.length;
      
//       payload.logger.info(`— Batch progress: ${batchSucceeded} succeeded, ${batchFailed} failed`);
      
//       // Log first few errors for debugging
//       results
//         .filter(result => result.status === 'rejected')
//         .slice(0, 2)
//         .forEach((result, index) => {
//           if (result.status === 'rejected') {
//             payload.logger.error(`— Error ${index + 1}: ${result.reason}`);
//           }
//         });
      
//     } catch (error) {
//       payload.logger.error(`Error processing batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
//       failed += batch.length;
//       processed += batch.length;
//     }
    
//     payload.logger.info(`— Overall progress: ${processed}/${total} (${Math.round(processed/total*100)}%) - ${succeeded} succeeded, ${failed} failed`);
//   }

//   payload.logger.info(`Market seeding completed! ${succeeded} markets successfully imported, ${failed} failed.`);
// };