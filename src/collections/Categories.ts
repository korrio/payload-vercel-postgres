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
  ],
}
