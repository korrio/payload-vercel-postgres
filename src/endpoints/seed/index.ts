import type { Payload, PayloadRequest } from 'payload'
// import { seedFranchises } from './seedFranchises'
// import { seedFranchisesDbd } from './seedFranchisesDbd'
// import { uploadFranchisesDbdLogos } from './uploadFranchisesDbdLogos'
// import { seedMarkets } from './seedMarkets'

// import { updateFranchiseCategories } from './updateFranchiseCategories'

// import { updateFranchiseFee } from './updateFranchiseFee'

// import { uploadFranchiseLogos } from './uploadFranchiseLogos'
// 
// import { uploadMarketImages } from './uploadMarketImages'

// This is an example of how to integrate your franchise seeding function with the main seed script

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Starting database seeding...')

  // Seed other collections first (if needed)
  // await seedOtherCollections({ payload, req })
  
  // Seed franchises data
  // await seedFranchises({ payload, req })
  // await seedFranchisesDbd({ payload, req })
  // await uploadFranchisesDbdLogos({ payload, req })
  // await updateFranchiseCategories({ payload, req })

  // await updateFranchiseFee({ payload, req })

  // payload.logger.info('Database seeding Franchise completed successfully!')

  // await uploadFranchisesDbdLogos({ payload, req })

  // payload.logger.info('Logo seeding completed successfully!')

  // await seedMarkets({ payload, req })

  // payload.logger.info('Database seeding Markets completed successfully!')

  // Then upload the images (this will update the markets with their images)
  // await uploadMarketImages({ payload, req });

  // payload.logger.info('Market images seeding completed successfully!')


}

// You can also create an endpoint to seed just the franchises
// export const seedFranchisesEndpoint = async (req: PayloadRequest, res: any): Promise<void> => {
//   try {
//     await seedFranchises({ payload: req.payload, req })
//     res.status(200).json({ success: true, message: 'Franchises seeded successfully!' })
//   } catch (error) {
//     console.error('Error seeding franchises:', error)
//     res.status(500).json({ success: false, message: 'Error seeding franchises', error })
//   }
// }