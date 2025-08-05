import { seedUsers } from './seed/seedUsers'
import { seedMedia } from './seed/seedMedia'

export const seedUsersMediaEndpoint = async (req: any) => {
  try {
    req.payload.logger.info('Starting users and media seeding...')
    
    // Seed users first
    await seedUsers({ payload: req.payload, req })
    
    // Then seed media  
    await seedMedia({ payload: req.payload, req })
    
    return Response.json({ 
      success: true, 
      message: 'Users and media seeded successfully!' 
    })
  } catch (error) {
    console.error('Error seeding users and media:', error)
    return Response.json({ 
      success: false, 
      message: 'Error seeding users and media', 
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}