import type { Payload, PayloadRequest } from 'payload'
import path from 'path'
import fs from 'fs'

export const seedMedia = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Starting media seeding...')

  // Sample media data - these would typically be actual image files
  const mediaData = [
    {
      filename: 'franchise-hero-banner.jpg',
      alt: 'Best Franchise Thailand Hero Banner',
      description: 'Main hero banner for franchise marketplace',
    },
    {
      filename: 'franchise-logo.png',
      alt: 'Best Franchise Thailand Logo',
      description: 'Company logo',
    },
    {
      filename: 'franchise-placeholder.jpg', 
      alt: 'Franchise Placeholder Image',
      description: 'Default placeholder for franchise listings',
    },
    {
      filename: 'market-placeholder.jpg',
      alt: 'Market Placeholder Image', 
      description: 'Default placeholder for market listings',
    },
    {
      filename: 'contact-banner.jpg',
      alt: 'Contact Us Banner',
      description: 'Banner image for contact page',
    },
    {
      filename: 'about-banner.jpg',
      alt: 'About Us Banner',
      description: 'Banner image for about page',
    },
  ]

  try {
    for (const media of mediaData) {
      // Check if media already exists
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: media.filename,
          },
        },
        limit: 1,
      })

      if (existingMedia.docs.length === 0) {
        // For now, just log that we would create media entries
        // In production, you would handle actual file uploads here
        payload.logger.info(`Would create media: ${media.filename} (${media.alt})`)
        
        // Note: Creating media entries without actual files requires file upload handling
        // This is a placeholder for the seeding structure
      } else {
        payload.logger.info(`Media already exists: ${media.filename}`)
      }
    }

    payload.logger.info('Media seeding completed successfully!')
  } catch (error) {
    payload.logger.error('Error seeding media:', error)
    throw error
  }
}