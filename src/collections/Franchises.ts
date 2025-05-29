import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// import { authenticated } from '../../access/authenticated'
// import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
// import { anyone } from '../../access/anyone'
// import { Banner } from '../../blocks/Banner/config'
// import { Code } from '../../blocks/Code/config'
// import { MediaBlock } from '../../blocks/MediaBlock/config'
// import { generatePreviewPath } from '../../utilities/generatePreviewPath'
// import { populateAuthors } from './hooks/populateAuthors'
// import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
// import { slugField } from '@/fields/slug'

export const Franchises: CollectionConfig<'franchises'> = {
  slug: 'franchises',
  access: {
    read: () => true,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    // slug: true,
    franchise_categories: true,
    // meta: {
    //   image: true,
    //   description: true,
    // },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'การจัดการข้อมูล',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'fcid',
      type: 'text',
      label: 'Franchise ID',
      admin: {
        position: 'sidebar',
      },
      unique: true,
    },
    {
      name: 'name_th',
      type: 'text',
      label: 'Thai Name',
      required: true,
    },
    {
      name: 'name_en',
      type: 'text',
      label: 'English Name',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'ความเป็นมา',
    },
    {
      name: 'products',
      type: 'textarea',
      label: 'สินค้าและบริการ',
    },
    {
      name: 'benefits',
      type: 'textarea',
      label: 'สิ่งที่ได้รับ',
    },
    {
      name: 'packages',
      type: 'textarea',
      label: 'แพ็คเกจการลงทุน',
    },
    {
      name: 'conditions',
      type: 'textarea',
      label: 'คุณสมบัติผู้ลงทุน',
    },
    {
      name: 'business_type',
      type: 'text',
      label: 'Business Type',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'franchise_fee',
      type: 'group',
      label: 'Franchise Fee',
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          defaultValue: 'บาท',
        },
      ],
    },
    {
      name: 'investment',
      type: 'group',
      label: 'Investment',
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          defaultValue: 'บาท',
        },
      ],
    },
    {
      name: 'working_capital',
      type: 'group',
      label: 'Working Capital',
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          defaultValue: 'บาท',
        },
      ],
    },
    {
      name: 'contract_period',
      type: 'group',
      label: 'Contract Period',
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          defaultValue: 'ปี',
        },
      ],
    },
    {
      name: 'roi_period',
      type: 'group',
      label: 'ROI Period',
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
        },
      ],
    },
    {
      name: 'branch_info',
      type: 'group',
      label: 'Branch Information',
      fields: [
        {
          name: 'headquarters',
          type: 'text',
          label: 'Headquarters',
        },
        {
          name: 'franchisee',
          type: 'text',
          label: 'Franchisee',
        },
        {
          name: 'international',
          type: 'text',
          label: 'International',
        },
      ],
    },
    {
      name: 'contact_info',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'company_name',
          type: 'text',
          label: 'Company Name',
        },
        {
          name: 'executive_name',
          type: 'text',
          label: 'Executive Name',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website',
        },
      ],
    },
    {
      name: 'social_stats',
      type: 'group',
      label: 'Social Stats',
      fields: [
        {
          name: 'views',
          type: 'text',
          label: 'Views',
        },
        {
          name: 'requests',
          type: 'text',
          label: 'Requests',
        },
        {
          name: 'votes',
          type: 'text',
          label: 'Votes',
        },
      ],
    },
    {
      name: 'historical_growth',
      type: 'array',
      label: 'Historical Growth',
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Year',
        },
        {
          name: 'headquarters',
          type: 'number',
          label: 'Headquarters',
        },
        {
          name: 'franchisee',
          type: 'number',
          label: 'Franchisee',
        },
        {
          name: 'international',
          type: 'number',
          label: 'International',
        },
        {
          name: 'total',
          type: 'number',
          label: 'Total',
        },
        {
          name: 'change',
          type: 'number',
          label: 'Change',
        },
      ],
    },
    {
      name: 'investment_packages',
      type: 'array',
      label: 'Investment Packages',
      fields: [
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      admin: {
        description: 'Upload franchise logo',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Franchise Images',
      admin: {
        description: 'Upload images related to this franchise',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
        {
          label: 'Draft',
          value: 'draft',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'แฟรนไชน์น่าลงทุน',
      admin: {
        position: 'sidebar',
        description: 'Display this franchise prominently',
      },
    },
    {
      name: 'new',
      type: 'checkbox',
      label: 'แฟรนไชน์มาใหม่',
      admin: {
        position: 'sidebar',
        description: 'Display this franchise prominently',
      },
    },
    {
      name: 'franchise_categories',
      type: 'relationship',
      label: 'หมวดหมู่',
      relationTo: 'franchise_categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => !!data?.createdBy,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => !!data?.createdBy,
      },
    },
    //...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
    beforeChange: [
      ({ req, operation, data }) => {
        if (req.user) {
          if (operation === 'create') {
            data.updatedBy = req.user.id;
            data.createdBy = req.user.id;
          } else if (operation === 'update') {
            data.updatedBy = req.user.id;
          }
          return data;
        }
      },
    ],
  },
  versions: false
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 100, // We set this interval for optimal live preview
  //     },
  //     schedulePublish: true,
  //   },
  //   maxPerDoc: 50,
  // },
}
