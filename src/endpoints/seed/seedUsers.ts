import type { Payload, PayloadRequest } from 'payload'

export const seedUsers = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Starting user seeding...')

  const usersData = [
    {
      email: 'admin@bestfranchisethailand.com',
      password: 'BestFranchise2024!',
      name: 'Admin User',
      role: 'admin' as const,
    },
    {
      email: 'editor@bestfranchisethailand.com', 
      password: 'Editor2024!',
      name: 'Content Editor',
      role: 'user' as const,
    },
    {
      email: 'manager@bestfranchisethailand.com',
      password: 'Manager2024!', 
      name: 'Franchise Manager',
      role: 'user' as const,
    },
    {
      email: 'support@bestfranchisethailand.com',
      password: 'Support2024!',
      name: 'Support Team',
      role: 'user' as const,
    },
    {
      email: 'demo@bestfranchisethailand.com',
      password: 'Demo2024!',
      name: 'Demo User',
      role: 'user' as const,
    },
  ]

  try {
    // Check if users already exist to avoid duplicates
    for (const userData of usersData) {
      const existingUser = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: userData.email,
          },
        },
        limit: 1,
      })

      if (existingUser.docs.length === 0) {
        await payload.create({
          collection: 'users',
          data: userData,
          req,
        })
        payload.logger.info(`Created user: ${userData.email}`)
      } else {
        payload.logger.info(`User already exists: ${userData.email}`)
      }
    }

    payload.logger.info('User seeding completed successfully!')
  } catch (error) {
    payload.logger.error('Error seeding users:', error)
    throw error
  }
}