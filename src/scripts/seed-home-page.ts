import payload from 'payload';
import { homePageData } from '../seed/home-page-data';

async function seedHomePage() {
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      local: true, // Important: This allows us to bypass API and work directly with the database
    });

    console.log('Payload initialized');

    // Check if home page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    });

    let result;
    
    if (existingPages.docs.length > 0) {
      // Update existing home page
      console.log('Updating existing home page...');
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: homePageData,
      });
      console.log('Home page updated successfully:', result.id);
    } else {
      // Create new home page
      console.log('Creating new home page...');
      result = await payload.create({
        collection: 'pages',
        data: homePageData,
      });
      console.log('Home page created successfully:', result.id);
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding home page:', error);
    process.exit(1);
  }
}

seedHomePage();