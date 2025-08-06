import type { CollectionConfig } from 'payload'

// import { anyone } from '../access/anyone'
// import { authenticated } from '../access/authenticated'
// import { slugField } from '@/fields/slug'

export const FranchiseCategories: CollectionConfig = {
  slug: 'franchise_categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'การจัดการข้อมูล',
  },
  fields: [
  	{
      name: 'title',
      type: 'text',
      label: 'Category Name',
      required: true,
    },
    {
      name: 'name_en',
      type: 'text',
      label: 'English Name',
    },
    // {
    //   name: 'slug',
    //   type: 'text',
    //   label: 'Slug',
    //   admin: {
    //     position: 'sidebar',
    //   },
    //   hooks: {
    //     beforeValidate: [
    //       ({ data }) => {
    //         // This would typically auto-generate a slug from the name
    //         // Just showing the structure here
    //         return data?.name?.toLowerCase().replace(/ /g, '-') || '';
    //       },
    //     ],
    //   },
    //   unique: true,
    //   required: true,
    // },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'icon',
      type: 'upload',
      label: 'Category Icon',
      relationTo: 'media',
    },
    {
      name: 'parent',
      type: 'relationship',
      label: 'Parent Category',
      relationTo: 'franchise_categories',
      admin: {
        position: 'sidebar',
      },
    },
    //...slugField(),
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
            description: 'A brief description of the franchise category for search engines (max 160 characters).',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Meta Keywords',
          admin: {
            description: 'Comma-separated keywords related to this franchise category.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          admin: {
            description: 'Image used when this franchise category is shared on social media.',
          },
        },
      ],
    },
  ],
}
