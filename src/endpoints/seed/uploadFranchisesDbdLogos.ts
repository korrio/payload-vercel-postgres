// import type { Payload, PayloadRequest } from 'payload'
// import fetch from 'node-fetch'

// // Define an interface for the franchise data structure
// interface FranchiseData {
//   id: string;
//   logo?: string;
//   brand_name?: string;
//   [key: string]: any; // Allow additional properties
// }

// // Define an interface for the logo map
// interface LogoMap {
//   [key: string]: string;
// }

// /**
//  * Utility function to download and upload franchise logos
//  * This is an optional step that you can run after seeding the franchises
//  * to associate the logos with the franchise entries
//  */
// export const uploadFranchisesDbdLogos = async ({
//   payload,
//   req,
// }: {
//   payload: Payload
//   req: PayloadRequest
// }): Promise<void> => {
//   payload.logger.info('Starting franchise logo uploads...')

//   // Get all franchises that have a logo URL
//   const franchises = await payload.find({
//     collection: 'franchises',
//     where: {
//       logo: {
//         exists: false,
//       },
//       fcid: {
//         exists: true,
//       }
//     },
//     depth: 0,
//     limit: 600
//   })

//   // If no franchises found, exit
//   if (!franchises.docs || franchises.docs.length === 0) {
//     payload.logger.info('No franchises found without logos. Exiting.')
//     return
//   }

//   payload.logger.info(`Found ${franchises.docs.length} franchises to process...`)

//   // Get the logo URLs from the original JSON file
//   const originalData = await import('./franchise_data_dbd_20250506_235749.json') as { default: FranchiseData[] }
  
//   // Create a map of FCIDs to logo URLs
//   const logoMap: LogoMap = {}
//   originalData.default.forEach((franchise: FranchiseData) => {
//     if (franchise.id && franchise.logo) {
//       logoMap[franchise.id] = franchise.logo
//     }
//   })

//   let successCount = 0
//   let failCount = 0

//   // Process each franchise
//   for (const franchise of franchises.docs) {
//     const logoUrl = logoMap[franchise.fcid as string]
    
//     if (!logoUrl) {
//       payload.logger.warn(`No logo URL found for franchise ${franchise.brand_name} (${franchise.id})`)
//       failCount++
//       continue
//     }
    
//     try {
//       // Download the logo
//       payload.logger.info(`Downloading logo for ${franchise.brand_name} from ${logoUrl}...`)
//       const response = await fetch(logoUrl)
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch logo: ${response.status} ${response.statusText}`)
//       }
      
//       // Convert to buffer
//       const buffer = await response.arrayBuffer()
//       const logoBuffer = Buffer.from(buffer)
      
//       // Get file extension and create filename
//       const extension = (logoUrl.split('.').pop() || 'png').toLowerCase()
//       const filename = `franchise-logo-${franchise.fcid}.${extension}`
      
//       // Determine MIME type based on extension
//       const mimeType = (() => {
//         switch (extension) {
//           case 'jpg':
//           case 'jpeg': return 'image/jpeg'
//           case 'png': return 'image/png'
//           case 'gif': return 'image/gif'
//           case 'webp': return 'image/webp'
//           case 'svg': return 'image/svg+xml'
//           default: return `image/${extension}`
//         }
//       })()
      
//       // Create media record
//       const media = await payload.create({
//         collection: 'media',
//         data: {
//           alt: `Logo for ${franchise.title}`,
//         },
//         file: {
//           data: logoBuffer,
//           mimetype: mimeType,
//           name: filename,
//           size: logoBuffer.length,
//         },
//         depth: 0,
//         context: {
//           disableRevalidate: true,
//         },
//       })
      
//       // Update franchise with logo reference
//       await payload.update({
//         collection: 'franchises',
//         id: franchise.id,
//         data: {
//           logo: media.id,
//         },
//         depth: 0,
//         context: {
//           disableRevalidate: true,
//         },
//       })
      
//       payload.logger.info(`Successfully uploaded logo for ${franchise.title}`)
//       successCount++
      
//     } catch (error) {
//       payload.logger.error(`Error uploading logo for ${franchise.title}: ${error instanceof Error ? error.message : String(error)}`)
//       failCount++
//     }
//   }
  
//   payload.logger.info(`Logo upload completed: ${successCount} successful, ${failCount} failed`)
// }