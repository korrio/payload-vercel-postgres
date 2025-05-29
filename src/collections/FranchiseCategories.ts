import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
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
  ],
}
