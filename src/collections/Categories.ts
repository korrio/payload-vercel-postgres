import type { CollectionConfig } from 'payload'

// import { anyone } from '../access/anyone'
// import { authenticated } from '../access/authenticated'
// import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'บทความ',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // ...slugField(),
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Meta',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Used for the page title in search results. If not provided, the category title will be used.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          maxLength: 160,
          admin: {
            description: 'A brief description of the category for search engines (max 160 characters).',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Meta Keywords',
          admin: {
            description: 'Comma-separated keywords related to this category.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          admin: {
            description: 'Image used when this category is shared on social media.',
          },
        },
      ],
    },
  ],
}
